//231022 적용 못시킴

import React from "react";
import { useEffect } from "react";
// import { useNavigate } from 'react-router-dom'; // gpt 231021 v6.0 버전부터 강의내용과 달라짐
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from 'react-router-dom'; 


export default function (SpecificComponent, option, adminRoute = null) {
    //null = 아무나 출입가능 페이지
    //ture = 로그인 유저만 출입가능
    //false = 로그인한 유저 출입 불가

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        const navigate = useNavigate(); // 추가
    
        useEffect(() => {
          dispatch(auth()).then((res) => {
            console.log(res);
          //로그인 하지 않은 상태
        if (!res.payload.isAuth) {
            if (option) {
              navigate("/login");
            }
          } else {
            // 로그인 한 상태
            if (adminRoute && !res.payload.isAdmin) {
                navigate("/");
            } else {
              if (option === false) {
                navigate("/");
              }
            }
          }
        });
      }, []);

    return (
      <SpecificComponent /> // component return이 없으면 React 실행이 안됨.
    );
  }

  return <AuthenticationCheck />;
}





