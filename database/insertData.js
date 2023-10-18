// 컬렉션 이름과 데이터를 받아서 해당 컬렉션에 데이터를 집어넣어주는 역할
const { connectDB } = require("./dbcon");
const PRE_MSG = "<insertData.js>";

async function insertData(collectionName, data) {
  console.log(`${PRE_MSG} dbcon.js를 불러들입니다.`);
  const db = await connectDB();
  console.dir(db);

  // mongsh에서 db.runCommand({ ping: 1 }) 실행한 것과 같은 기능 수행
  const pingResult = await db.command({ ping: 1 });
  console.log(`${PRE_MSG} mongoDB 연결상태: ${JSON.stringify(pingResult)}`);

  if (db) {
    try {
      const collection = db.collection(collectionName);

      const result = await collection.insertOne(data);
      // console.dir(result);

      if (result.acknowledged) {
        console.log(
          `${PRE_MSG} ${result.insertedId} 데이터가 성공적으로 삽입되었습니다.`
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

module.exports = { insertData };
