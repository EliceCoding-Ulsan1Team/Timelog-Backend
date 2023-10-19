//서버js (231019)

const express = require("express");
const dotenv = require("dotenv");  //몽고디비 id,비번 보안(FU) .gitignore
dotenv.config();
const app = express();
const port = 3020; //기존5000번 포트 -> 3010로 수정(FU) / backend port
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


//몽고db 연결이 안됨 (그전 파일에서 사용중이라 그런것같다)(23.10.19)
mongoose
.connect(`mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@fu.jfjaess.mongodb.net/Fu`, {
  useNewUrlParser: true, 
//   useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
})
  .then(() => console.log('Connected to MongoDB!!')) //문구 수정(FU)
  .catch((err) => console.log(err));





app.get("/", (req, res) => res.send("안녕 서버")); //문구 수정(FU)

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
    // 요청된 이메일을 데이터베이스 찾기
    User.findOne({ email: req.body.email })
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
    //   isAdmin: req.user.role === 0? false : true,
      // isAdmin 부분 설명 (기능 보류 231019)
      // role 1 어드민 role 2 특정 부서 어드민
      // role 0 -> 일반유저 role 0이 아니면 관리자
      name: req.user.name,
      email: req.user.email,
    //   lastname: req.user.lastname,
    //   role: req.user.role,
    //   image: req.user.image,
    });
  });

// 로그 아웃
// app.get("/api/users/logout", auth, (req, res) => {
//     User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
//       if (err) return res.json({ success: false, err });
//       return res.status(200).send({
//         success: true,
//       });
//     });
//   });

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
  

// 내정보 (구현x 231019)
//   app.get("/api/infos", function (req, res) {
//     User.find({}).exec(function (err, users) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(users);
//       }
//     });
//   });


app.listen(port, () => console.log(`example port ${port}`));