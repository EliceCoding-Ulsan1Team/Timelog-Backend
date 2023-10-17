// MongoDB 모듈 불러오기
const { MongoClient } = require("mongodb");

// 시간 기록 함수 불러오기
const createDoc = require("./createDocument");

const PRE_MSG = "<SYSTEM>";
const COLLECTIONS_DESC = [
  "모든 유저들의 할 일 대분류 및 소분류에 대한 정의",
  "모든 유저의 id와 비밀번호(암호화)",
  "모든 유저들의 가입정보(이름, 전화번호, 가입일 등)",
  "각 유저마다 1개씩 생성되는 로그파일",
];

const username = encodeURIComponent("admin");
const password = encodeURIComponent("1111");
const cluster = "cluster-test-001";
const dbName = "timelogDB";
const url = `mongodb+srv://${username}:${password}@${cluster}.eahmjck.mongodb.net/${dbName}`;

const collectionName = "test";

const client = new MongoClient(url);

// 테스트용 데이터
const userData = {
  id: "anonymous",
  mobile: "010-0000-1234",
  email: "a@gmail.com",
};

async function connectDB() {
  try {
    await client.connect();
    console.log(
      `${PRE_MSG} MongoDB 서버 '${dbName}' 데이터베이스에 연결되었습니다.`
    );

    const db = client.db();

    // 'users'컬렉션에 데이터 등록
    try {
      await db.collection("users").insertOne(userData);
    } catch (err) {
      console.error(
        `[users] 컬렉션에 데이터를 등록 중 ${err} 오류가 발생했습니다.`
      );
    }

    // 컬렉션 목록 출력
    const collections = await db.listCollections().toArray();
    console.log(
      "\n-----------------------< 컬렉션 목록 >-----------------------"
    );
    for (let i = 0; i < collections.length; i++) {
      console.log(`${collections[i].name}  ->  ${COLLECTIONS_DESC[i]}`);
    }
    console.log("-".repeat(60), "\n");
    //

    // user 컬렉션에 등록된 사용자 목록 출력
    const usersAllDocuments = await db.collection("users").find().toArray();
    console.log("\n------< 'users' 컬렉션 >------");
    usersAllDocuments.forEach((doc) => {
      console.log(`- ${doc.name}  ${doc.userID}`);
    });
    console.log("----------------------------\n");
    /*

     */
  } catch (err) {
    console.error(`${PRE_MSG} MongDB 서버에 연결할 수 없습니다.`, err);
    /*
    
     */
  } finally {
  }
}

// 더미 데이터 (타임로그 기록)
const todo = "설거지";
const startTime = "2023-10-07T06:00:00Z";
const endTime = "2023-10-07T06:00:00Z";
const elapsedTime = 30;
const userTimeLog = {
  userID: "user0000",
  date: new Date(),
  log: [
    {
      todo: todo,
      startTime: startTime,
      endTime: endTime,
      elapsedTime: elapsedTime,
    },
  ],
};

async function main() {
  // 데이터베이스 연결 실행
  await connectDB();

  // 장면2의 시간기록 부분. db를 이렇게 넘기면 되는 것인지...?
  await createDoc(userTimeLog, db);

  await client.close();
  console.log(`${PRE_MSG} MongoDB 서버 연결이 종료되었습니다.`);
}

module.exports = main;
