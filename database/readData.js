/* 컬렉션 이름과 데이터를 받아와서 해당 컬렉션에서 원하는 데이터를 조회해주는 역할
    by aain */
const { connectDB } = require("./dbcon");
const PRE_MSG = "<readData.js>";

async function readData(collectionName, userID) {
  console.log(`${PRE_MSG} dbcon.js를 실행합니다.`);
  const db = await connectDB();

  let result;

  if (db) {
    try {
      const collection = db.collection(collectionName);
      result = await collection.findOne({ userID });
    } catch (err) {
      console.error(`${PRE_MSG} ${userID}의 데이터를 ${collectionName}에서 가져오던 중 에러가 발생하였습니다.
        Error 내용: ${err}`);
    }
  }
  return result;
}

module.exports = { readData };
