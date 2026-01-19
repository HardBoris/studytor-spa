import { Helmet } from "react-helmet";
import "./signup.style.css";
import { SignupForm } from "./SignupForm";
import BGModal from "../../components/BGmodal";
import { useState } from "react";
import { NovoInstituto } from "./NovoInstituto";

export const Signup = () => {
  const [newInstitutionOpen, setNewInstitutionOpen] = useState(false);

  const institutionModal = () => {
    setNewInstitutionOpen(!newInstitutionOpen);
  };

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
      <BGModal isOpen={newInstitutionOpen} setIsOpen={institutionModal}>
        <NovoInstituto fechar={institutionModal} />
      </BGModal>
    </>
  );
};
