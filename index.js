//서버js (231019)

const express = require("express");
const app = express();
const port = 8000; //기존5000번 포트 -> 3010로 수정(FU) / backend port
const mongoose = require("mongoose");


//몽고db 연결이 안됨 (그전 파일에서 사용중이라 그런것같다)(23.10.19)
mongoose
.connect(`mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@fu.jfjaess.mongodb.net/Fu`, {
  useNewUrlParser: true, 
//   useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
})
  .then(() => console.log('Connected to MongoDB')) //문구 수정(FU)
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("하이")); //문구 수정(FU)

app.listen(port, () => console.log(`example port ${port}`));