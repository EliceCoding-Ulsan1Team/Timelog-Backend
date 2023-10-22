// Routing 처리 231020

import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
// import Profile from "./components/views/Profile/Profile";
// import Auth from "./hoc/auth";


function App() {

  // const NewLandingPage = Auth(LandingPage, null);
  // const NewLLoginPage = Auth(LoginPage, null);
  // const NewRegisterPage = Auth(RegisterPage, null);


  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
        <Route path="/" element={<LandingPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/profile" element={<Profile />}/> */}
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
