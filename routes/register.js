// 회원가입 페이지로 라우팅

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
