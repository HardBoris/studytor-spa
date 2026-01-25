import "./instituto.style.css";
import { InstitutionForm } from "./InstitutionForm";
import React from "react";
import { Helmet } from "react-helmet";

export const Institution = () => {
  return (
    <>
      <Helmet>
        <title>Studytor | Institution</title>
      </Helmet>
      <div className="instituto">
        {/* <div className="login-fitment"></div>*/}
        <div className="instituto-still">
          <InstitutionForm />
        </div>
      </div>
    </>
  );
};
