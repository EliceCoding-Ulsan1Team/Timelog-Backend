import React, { useEffect } from "react";
// import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // gpt 231021 v6.0 버전부터 강의내용과 달라짐
// import Auth from "../hoc/auth";



function LandingPage() {
  const navigate = useNavigate(); // 추가
  // const [userData, setUserData] = useState({});
  //서버로 res
  useEffect(() => {
    axios.get('/api/hello')
      .then(response => console.log(response.data))
  }, [])


 //로그아웃 /로그아웃 시 if문의 조건의 api로 이동
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((res) => {
      console.log(res.data);
      if (res.data.success) {
        navigate("/login");
      } else {
        alert("로그아웃 중에 오류가 발생했습니다.");
      }
    });
  };

  // //내정보를 표시하는 곳 //-> 연결되자마자 열리는 문제가있음 수정 필요
  // const getMyProfile = () => {
  //   axios.get("/api/users/myprofile").then((response) => {
  //     if (response.data.success) {
  //       setUserData(response.data);
  //     } else {
  //       alert("내 정보를 가져오는 데 실패했습니다.");
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getMyProfile();
  // }, []);


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh"
      }}>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
      {/* <button onClick={onClickHandler}>내정보</button> */}

    </div>
  )
}

export default LandingPage
