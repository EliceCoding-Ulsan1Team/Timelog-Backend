// 데이터 CRUD 테스트용 파일.

// 데이터 CRUD 컴포넌트들  불러오기
const { createData } = require("../database/createData");
const { readData } = require("../database/readData");
const { updateData } = require("../database/updateData");
const { deleteData } = require("../database/deleteData");

const collectionName = "users";

// 더미 데이터
// 서울 표준 시간대 설정, But 한국시간대로 변경이 안되고 있음
const timeZone = "Asia/Seoul";
let seoulTimeDate = new Date();
seoulTimeDate.toLocaleString("ko-KR", { hour12: false });

const todo = "개발공부";
const startTime = "2023-10-07T06:00:00Z";
const endTime = "2023-10-07T06:00:00Z";
const elapsedTime = 100;

const userTimeLogData = {
  userID: "leeaain",
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

// 데이터 생성 테스트 (컬렉션명, 데이터(완전체))
// createData(collectionName, userTimeLogData);

// 데이터 읽기 테스트 (컬렉션명, userID)
// readData(collectionName, "leeaain");

// 데이터 수정 테스트 (컬렉션명, userID, 업뎃할데이터(부분가능))
// updateData("users", "leeaain", { name: "리아인" });

// 데이터 삭제 테스트 (컬렉션명, userID)
deleteData("userTimeLog", "유저");
