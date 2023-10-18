var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "엘리스 1팀 (울산)" });
});

module.exports = router;
