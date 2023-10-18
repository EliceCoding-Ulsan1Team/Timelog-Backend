// MongoDB 모듈 불러오기
const { MongoClient } = require("mongodb");
const { object } = require("webidl-conversions");

const PRE_MSG = "<dbcon.js>";
console.log(`${PRE_MSG} mongoDB 접속중`);
// db접속 정보
const username = encodeURIComponent("admin");
const password = encodeURIComponent("1111");
const cluster = "cluster-test-001";
const dbName = "timelogDB";
const url = `mongodb+srv://${username}:${password}@${cluster}.eahmjck.mongodb.net/${dbName}`;
const client = new MongoClient(url);

// db 연결
async function connectDB() {
  let db;
  try {
    await client.connect();
    console.log(
      `${PRE_MSG} mongoDB '${dbName}' 데이터베이스에 연결되었습니다.`
    );

    db = client.db();

    // mongsh에서 db.runCommand({ ping: 1 }) 실행한 것과 같은 기능 수행
    const pingResult = await db.command({ ping: 1 });
    console.log(`${PRE_MSG} mongoDB 연결상태: ${JSON.stringify(pingResult)}`);
  } catch (err) {
    console.error(`${PRE_MSG} mongoDB에 연결할 수 없습니다.`, err);
  } finally {
  }

  return db;
}

// connectDB();

module.exports = { connectDB };
