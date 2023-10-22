const { createData } = require("../database/createData");

// 회원가입 컬렉션 'users'
const collectionName = "users";

// 회원가입-더미 데이터
const userData = {
  userID: "leeaain",
  name: "이아인",
  mobile: "010-0000-1234",
  email: "1@gmail.com",
  signDate: new Date(),
};

createData(collectionName, userData);
