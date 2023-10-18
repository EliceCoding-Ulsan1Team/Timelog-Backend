// insertData.js를 이용하여 타임로그 컬렉션에 더미 데이터를 삽입하는 테스트 파일
const { insertData } = require("./insertData");

const collectionName = "userTimeLog";

// 더미 데이터
// 서울 표준 시간대 설정, But 한국시간대로 변경이 안되고 있음
const timeZone = "Asia/Seoul";
let seoulTimeDate = new Date();
seoulTimeDate.toLocaleString("ko-KR", { hour12: false });

const todo = "산책";
const startTime = "2023-10-07T06:00:00Z";
const endTime = "2023-10-07T06:00:00Z";
const elapsedTime = 100;

const userTimeLogData = {
  userID: "유저",
  date: seoulTimeDate,
  log: [
    {
      todo: todo,
      startTime: startTime,
      endTime: endTime,
      elapsedTime: elapsedTime,
    },
  ],
};
// 더미 데이터 끝

insertData(collectionName, userTimeLogData);
