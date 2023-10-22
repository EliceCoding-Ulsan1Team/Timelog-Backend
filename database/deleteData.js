/* 컬렉션 이름, userID, new데이터를 받아서 해당 컬렉션에서 일치하는 데이터를 찾아 삭제함
by aain */

/* 삭제 부분은 조금 더 고민해보아야 함. 각 페이지마다 삭제 로직에 대한 고민 더 필요. 
ex) 회원정보 삭제, 설정값의 일부만 삭제할 경우, 타임로그 기록 한개만 삭제할 경우 등등 */
const { connectDB } = require("./dbcon");
const PRE_MSG = "<deleteData.js>";

async function deleteData(collectionName, userID) {
  console.log(`${PRE_MSG} dbcon.js를 실행합니다.`);
  const db = await connectDB();

  if (db) {
    try {
      const collection = db.collection(collectionName);

      const result = await collection.deleteOne({ userID });

      if (result.acknowledged) {
        console.log(`${PRE_MSG} 데이터가 삭제되었습니다.`);
      } else {
        console.log(`${PRE_MSG} 데이터 삭제 실패`);
      }
    } catch (err) {
      console.error(`${PRE_MSG} 데이터 삭제 중 ${err} 오류 발생`);
    }
  } else {
    console.log(`${PRE_MSG} db 연결이 되지 않았습니다.`);
  }
}

module.exports = { deleteData };
