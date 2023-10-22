//231021 우리팀 형식대로 작성중
// 회원가입 버튼 구현x
import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from 'react-router-dom'; // gpt 231021 v6.0 버전부터 강의내용과 달라짐


function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 추가

  const [Id,setId] = useState("")
  const [Password,setPassword] = useState("")


  //id 이벤트 핸들러
  const onIdHandler = (event) => {
    setId(event.currentTarget.value)
  };

  //password 이벤트 핸들러
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  };

  //버튼 이벤트 핸들러 / 로그인 
  const onSubmitHandler = (event) => {
    // 페이지 리프레시 방지 preventDefault
    event.preventDefault();

    //서버로 보내는 부분 231021
    let body = {
      id: Id,
      password: Password
    };
    //than 이후 부터 로그인 후 이동되는 page
    dispatch(loginUser(body))
    .then((response) => {
      if (response.payload.loginSuccess) {
        navigate('/'); // gpt 231021 v6.0 버전부터 강의내용과 달라짐
      } else {
        alert("넌 틀렸어!");
      }
    });
};

 // 회원가입 페이지로 이동하는 함수
 const goToRegisterPage = () => {
  navigate('/register');
}

  return (
    <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection:"column",
      height:"100vh"
    }}>
      <form 
      onSubmit={onSubmitHandler}
      style={{ display: "flex", flexDirection: "column" }}>
      <label>id</label>
        <input type="id" value={Id} onChange={onIdHandler} />
        <label>password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button type="submit">로그인</button>
        <br />
        <button type="button" onClick={goToRegisterPage}>회원가입</button>

      </form>
    </div>
  )
}

export default LoginPage; 
