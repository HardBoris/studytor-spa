import { Helmet } from "react-helmet";
//import { useInstitution } from "../../context/InstitutionContext";
import "./dashboard.style.css";
import { useAuth } from "../../context/UserContext";
//import { BGbutton } from "../../components/BGbutton";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  //const { miInstituto } = useInstitution();
  const { institution } = useAuth();

  return (
    <>
      <Helmet>
        <title>Studytor | cualquercoisa</title>
      </Helmet>
      <div className="dashboard">
        <h1>{institution.institutionName}</h1>
        <div className="separator">
          <Link to={"/" + institution.institutionId + "/perguntanova"}>
            <span>Perguntas</span>
          </Link>
        </div>
      </div>
    </>
  );
};
