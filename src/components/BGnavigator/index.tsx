import { Link } from "react-router-dom";
import "./navigator.style.css";
//import { useAuth } from "../../context/UserContext";
import {
  FaArrowAltCircleDown,
  // FaArrowAltCircleLeft,
  // FaArrowAltCircleRight,
  FaHome,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
// import { MdRequestPage, MdViewList } from "react-icons/md";
// import { GiOpenTreasureChest } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";

export const BGNavigator = () => {
  //const { signOut /* company */ } = useAuth();

  return (
    <nav>
      <div className="navigator">
        <Link to="/">
          <span>Home</span>
          {/* <FaHome /> */}
        </Link>
      </div>
      <div className="navigator">
        <Link to="/login">
          <span>LogIn</span>
          {/*<BiLogIn/>*/}
        </Link>
      </div>
      <div className="navigator">
        <Link to="/signup">
          <span>SignUp</span>
          {/* <FaArrowAltCircleDown/> */}
        </Link>
      </div>
      {/* {company && (
        <> */}
      <div className="navigator">
        <Link to="/" onClick={() => {}}>
          <span>Dashboard</span>
          {/* <AiFillDashboard/> */}
        </Link>
      </div>
      <div className="navigator">
        <Link to={`/test/purchases`} onClick={() => {}}>
          <span>Compras</span>
          {/* <FaShoppingCart/> */}
        </Link>
      </div>
      {/* <div className="navigator">
        <Link to={`/${company.companyId}/entries`} onClick={() => {}}>
          <GiOpenTreasureChest />
        </Link>
      </div> */}
      {/* <div className="navigator">
        <Link to={`/${company.companyId}/movements`} onClick={() => {}}>
          <MdViewList />
        </Link>
      </div> */}
      {/* <div className="navigator">
        <Link to={`/${company.companyId}/requisitions`} onClick={() => {}}>
          <MdRequestPage />
        </Link>
      </div> */}
      {/* </>
      )} */}
      {/*<div className="navigator">
        <Link to="/" onClick={() => signOut()}>
          {/* <span>Salir</span>
          <FaSignOutAlt />
        </Link>
      </div>*/}
    </nav>
  );
};
