import { Helmet } from "react-helmet";
import "./signup.style.css";
import { SignupForm } from "./SignupForm";

export const Signup = () => {
  return (
    <>
      <Helmet>
        <title>Aventura | Signup</title>
      </Helmet>
      <div className="signup">
        <div className="signup-still">
          <SignupForm />
        </div>
        <div className="signup-fitment"></div>
      </div>
    </>
  );
};
