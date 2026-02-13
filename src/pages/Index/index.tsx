import { Helmet } from "react-helmet";
import { useInstitution } from "../../context/InstitutionContext";
import "./index.css";

export const Index = () => {
  const { miInstituto } = useInstitution();

  return (
    <>
      <Helmet>
        <title>Studytor | cualquercoisa</title>
      </Helmet>
      <div className="indice-instituto">
        <h1>{miInstituto.institutionName}</h1>
        <h1>Indice</h1>
        {/* <div className="login-fitment"></div>
        <div className="instituto-still"></div> */}
      </div>
    </>
  );
};
