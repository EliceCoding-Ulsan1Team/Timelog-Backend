// 장면2 에서 사용자가 버튼을 클릭하면 '자신이 한 일'과 시작/종료 시간을 기록하는 함수.
function createDoc(val) {
  console.log(`  <시간 기록>
  사용자가 ${val}의 시작(혹은 종료) 버튼을 클릭하였습니다. 
  ${val}기록을 데이터베이스에 전송합니다.
  `);
}

// export default createDoc;
module.exports = createDoc;
