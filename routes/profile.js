/* --by aain-- */
const express = require("express");
const router = express.Router();

const { readData } = require("../database/readData");
const dateFormatter = require("../controller/dateFormatter");
const PRE_MSG = "<profile.js>";

/* GET myinfo page. */
router.get("/", async (req, res) => {
  console.log("profile 페이지 접속 완료");
  res.end("profile 페이지 접속 완료");
});

router.get("/:userID", async (req, res) => {
  const userID = req.params.userID;
  const collectionName = "users";

  try {
    const userData = await readData(collectionName, userID);
    if (userData) {
      console.log(userData.signDate);
      userData.signDate = dateFormatter(userData.signDate);
      // 프론트로 데이터를 넘겨주는 부분!
      res.json(userData);
      // res.render("profile", { userData });

      /* Node.js 또는 Express.js의 메소드. 'userData'라는 js객체를 json형식으로 직렬화하여 클라이언트에게 반환함.
      
      리액트(클라이언트측)에서 사용하는 res.json()은 'fetch' API나 다른 HTTP 클라이언트 라이브러리에서 제공하는 메서드.
      서버로부터 받은 JSON 응답을 js 객체로 다시 파싱함. 
      둘은 서로 다른 메서드.

      보다 더 명시적으로 표현하기 위해 JSON.stringify(data), JSON.parse(data)를 사용하는 것도 좋을 듯.
      */
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
  } catch (err) {
    console.error(`${PRE_MSG} DB에서 쿼리 중 오류 : ${err}`);
    res.status(500).json({ message: "DB에서 쿼리 중 오류" });
  }
});

module.exports = router;
