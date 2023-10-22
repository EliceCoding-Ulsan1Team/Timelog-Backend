import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from 'react-router-dom'; // gpt 231021 v6.0 버전부터 강의내용과 달라짐


function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 추가

  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Mobile, setMobile] = useState("")
  const [Id, setId] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  


 //이름 이벤트 핸들러
 const onNameHandler = (event) => {
  setName(event.currentTarget.value)
};

    //이메일 이벤트 핸들러
    const onEmailHandler = (event) => {
      setEmail(event.currentTarget.value)
    };

  // 전화번호 이벤트 핸들러
  const onMobileHandler = (event) => {
    setMobile(event.currentTarget.value)
  };

  //아이디 이벤트 핸들러
  const onIdHandler = (event) => {
    setId(event.currentTarget.value)
  };

  //password 이벤트 핸들러
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  };

   //비밀번호확인 이벤트 핸들러
   const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  };

  //버튼 이벤트 핸들러 / 로그인 
  const onSubmitHandler = (event) => {
    // 페이지 리프레시 방지 preventDefault
    event.preventDefault();

    //비밀번호와 비밀번호 확인이 같은지 확인해주는 곳
    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    //서버로 보내는 부분 231021
    let body = {
      name: Name,
      email: Email,
      mobile: Mobile,
      id: Id,
      password: Password,
    };

    //회원가입이 되면 로그인 페이지로 이동
    dispatch(registerUser(body))
      .then((response) => {
        if (response.payload.success) {
          alert("회원 가입 완료되었습니다");
          navigate('/login'); // gpt 231021 v6.0 버전부터 강의내용과 달라짐
        } else {
          alert("회원가입 실패요");
        }
      });
  };


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh"
      }}>
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}>
        <label>이름</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>이메일</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>전화번호</label>
        <input type="text" value={Mobile} onChange={onMobileHandler} />

        <label>아이디</label>
        <input type="text" value={Id} onChange={onIdHandler} />

        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>비밀번호 확인</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button type="submit">가입하기</button>

      </form>
    </div>
  )
}

export default RegisterPage
