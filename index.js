//서버js (231019)

const express = require("express");
const dotenv = require("dotenv");  //몽고디비 id,비번 보안(FU) .gitignore
dotenv.config();
const app = express();
const port = 3020; //기존5000번 포트 -> 3010로 수정(FU) / backend port
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/User");

// application/x-www/form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//appication/json
app.use(bodyParser.json());


//몽고db 연결이 안됨 (그전 파일에서 사용중이라 그런것같다)(23.10.19)
mongoose
.connect(`mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@fu.jfjaess.mongodb.net/Fu`, {
  useNewUrlParser: true, 
//   useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
})
  .then(() => console.log('Connected to MongoDB')) //문구 수정(FU)
  .catch((err) => console.log(err));





app.get("/", (req, res) => res.send("안녕 서버")); //문구 수정(FU)

//회원가입을 위한 라운트
// mongoDB 6.0 버전 이하 문제로 코드 수정 (gpt)
app.post("/register", async (req, res) => {
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
  



app.listen(port, () => console.log(`example port ${port}`));