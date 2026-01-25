import "./login.style.css";
import { LoginForm } from "./LoginForm";
import React from "react";
import { Helmet } from "react-helmet";
import login_picture from "../../assets/pictures/login_image.png";

export const Login = () => {
  return (
    <>
      <Helmet>
        <title>Studytor | Login</title>
      </Helmet>
      <div className="login">
        <div className="login-fitment">
          <picture>
            <img src={login_picture} alt="" />
          </picture>
        </div>
        <div className="login-still">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
