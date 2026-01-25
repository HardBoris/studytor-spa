import { Helmet } from "react-helmet";
import "./signup.style.css";
import { SignupForm } from "./SignupForm";
import BGModal from "../../components/BGmodal";
import { useState } from "react";
import { NovoInstituto } from "./NovoInstituto";
import cadastro_picture from "../../assets/pictures/cadastro-image.jpeg";

export const Signup = () => {
  const [newInstitutionOpen, setNewInstitutionOpen] = useState(false);

  const institutionModal = () => {
    setNewInstitutionOpen(!newInstitutionOpen);
  };

  return (
    <>
      <Helmet>
        <title>Studytor | Signup</title>
      </Helmet>
      <div className="signup">
        <div className="signup-still">
          <SignupForm />
        </div>
        <div className="signup-fitment">
          <picture>
            <img src={cadastro_picture} alt="" />
          </picture>
        </div>
      </div>
      <BGModal isOpen={newInstitutionOpen} setIsOpen={institutionModal}>
        <NovoInstituto fechar={institutionModal} />
      </BGModal>
    </>
  );
};
