//서버js (231019)

const express = require("express");
const dotenv = require("dotenv");  //몽고디비 id,비번 보안(FU) .gitignore
dotenv.config();
const app = express();
const port = 3020; //backend port
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

// application/x-www/form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//appication/json
app.use(bodyParser.json());
app.use(cookieParser());


//몽고db 연결(23.10.19)
// mongoose
//   .connect(`mongodb+srv://${process.env.DBuser}:${process.env.DBpsword}@fu.jfjaess.mongodb.net/Fu`, {
//     useNewUrlParser: true,
//     //   useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
//   })
//   .then(() => console.log('Connected to MongoDB!!')) //몽고DB 접속 성공시 
//   .catch((err) => console.log(err));


  //test mongoDB 연결code(231020) - 최종작업후 지욼것
mongoose
  .connect(`mongodb+srv://onigiri282:ro4rKj0GXvXyqc5u@fu.jfjaess.mongodb.net/Fu`, {
    useNewUrlParser: true,
    //   useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB!!')) //몽고DB 접속 성공시 
  .catch((err) => console.log(err));





app.get("/", (req, res) => res.send("루트입니다root-react"));

app.get("/api/hello", (req, res) => {
  res.send("hello!!");
}); //front 연결test 231020

//회원가입 라운트
// mongoDB 6.0 버전 이하 문제로 코드 수정 (gpt)
app.post("/api/users/register", async (req, res) => {
  try {
    // 회원가입 할 때 필요한 정보들은 클라이언트에서 가져오면 그것들을 DB에 넣어줍니다.
    const user = new User(req.body);

    // save() 메서드는 Promise를 반환합니다. 따라서 await을 사용하여 처리합니다.
    const userInfo = await user.save();

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

//gpt(수정) 6.0 callback 미지원(231019)
app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스 찾기 //231021 요청을 email -> id로 수정
  User.findOne({ id: req.body.id })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: '제공된 이메일에 해당하는 유저가 없습니다.',
        });
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' });

        // 비밀번호가 일치하면 토큰 생성 및 저장
        user.generateToken()
          .then((user) => {
            res.cookie('x_auth', user.token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id });
          })
          .catch((err) => {
            return res.status(400).send(err);
          });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

// auth 미들웨어
app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 auth이 true 라는 말
  res.status(200).json({
    //원하는 정보만 전달
    _id: req.user._id,
    isAuth: true,
    isAdmin: req.user.role === 0? false : true,
    // isAdmin 부분 설명 (기능 보류 231019)(프론트기능 테스트위해 살림231022)
    // role 1 어드민 role 2 특정 부서 어드민
    // role 0 -> 일반유저 role 0이 아니면 관리자
    name: req.user.name,
    email: req.user.email,
    mobile: req.user.mobile,
    //   lastname: req.user.lastname,
    //   role: req.user.role,
    //   image: req.user.image,
  });
});

// 로그 아웃
//gpt 6.0 callback 지원x(231019)
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdateWithToken(req.user._id, req.token)
    .then((user) => {
      res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

//내 정보 api
app.get("/api/users/myprofile", auth, (req, res) => {
  // 인증된 사용자의 프로필 정보를 가져오는 코드를 작성합니다.
  const user = req.user; // 이미 auth 미들웨어에서 유저 정보를 가져왔으므로 사용 가능

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile // 전화번호 추가(23.10.19)
    // 추가 필드에 따라 프로필 정보를 확장할 수 있습니다.
  });
});

//내 정보 수정 api
// 
app.post("/api/users/updateprofile", auth, async (req, res) => {
  try {
    // 수정된 정보를 가져와서 사용자 정보 업데이트
    const user = req.user; // 이미 auth 미들웨어에서 유저 정보를 가져왔으므로 사용 가능
    user.name = req.body.name; // 이름 수정
    user.email = req.body.email; // 이메일 수정
    user.mobile = req.body.mobile;  //전화번호 수정

    // 수정된 정보 저장
    const updatedUser = await user.save();

    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile
      // 추가 필드에 따라 응답을 확장할 수 있습니다.
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(port, () => console.log(`example port ${port}`));