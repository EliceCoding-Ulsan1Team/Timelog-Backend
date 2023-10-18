// 회원가입 기능
const { connectDB } = require("./dbcon");

async function signUser() {
  const db = await connectDB();

  const userData = {
    userID: "leeaain",
    name: "이아인",
    mobile: "010-0000-1234",
    email: "1@gmail.com",
    signDate: new Date(),
  };

  try {
    await db.collection("users").insertOne(userData);
  } catch (err) {
    console.error(
      `[users] 컬렉션에 데이터를 등록 중 ${err} 오류가 발생했습니다.`
    );
  }
}

signUser();
