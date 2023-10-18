var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/* --라우터 by aain-- */
// 장면0-랜딩페이지, 경로명 : "/"
var indexRouter = require("./routes/index");

// 장면1.1-로그인 & 장면1.2-회원가입, 경로명 : "/login", "/sign"
var usersRouter = require("./routes/users");

// 장면1.3-내 정보, 경로명: "/myinfo"
const myinfoRouter = require("./routes/myinfo");

// 장면2-메인화면 경로명 : "/login", "/sign", "/myinfo"
const mainRouter = require("./routes/main");

// 장면3-설정화면, 경로명: "/setting"
const settingRouter = require("./routes/setting");
/* --라우터 by aain-- */

var app = express();

/* --by aain-- */
// const { connectDB } = require("./database/dbcon");
const { readData } = require("./database/readData");
const { createData } = require("./database/createData");
const PRE_MSG = "<app.js>";
/* --by aain-- */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

/* --by aain-- */
/* <장면2-메인화면>에서 우측 상단 동그라미 user 버튼 클릭했을 때 
    /myinfo (장면3-내 정보)로 넘어가는 라우팅 */
app.use("/myinfo", myinfoRouter);
/* --by aain-- */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
