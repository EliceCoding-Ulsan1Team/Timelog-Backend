/* 컬렉션 이름, userID, new데이터를 받아서 해당 컬렉션에서 일치하는 데이터를 찾아 수정해줌
by aain */
const { connectDB } = require("./dbcon");
const PRE_MSG = "<updateData.js>";

async function updateData(collectionName, userID, newData) {
  console.log(`${PRE_MSG} dbcon.js를 실행합니다.`);
  const db = await connectDB();

  if (db) {
    try {
      const collection = db.collection(collectionName);

      const filter = { userID };
      const newDocument = { $set: newData };

      const result = await collection.updateOne(filter, newDocument);

      if (result.acknowledged) {
        console.log(
          `${PRE_MSG} ${result.upsertedId} 데이터가 성공적으로 삽입되었습니다.`
        );
      } else {
        console.log(`${PRE_MSG} 데이터 삽입 실패`);
      }
    } catch (err) {
      console.error(`${PRE_MSG} 데이터 삽입 중 ${err} 오류 발생`);
    }
  } else {
    console.log(`${PRE_MSG} db 연결이 되지 않았습니다.`);
  }
}

module.exports = { updateData };
