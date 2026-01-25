import { Link } from "react-router-dom";
import "./login.style.css";
import { LoginForm } from "./LoginForm";
import React from "react";
import { Helmet } from "react-helmet";

export const Login = () => {
  return (
    <>
      <Helmet>
        <title>Studytor | Login</title>
      </Helmet>
      <div className="login">
        <div className="login-fitment"></div>
        <div className="login-still">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
