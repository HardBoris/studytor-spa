import { Link } from "react-router-dom";
import "./navigator.style.css";
//import { useAuth } from "../../context/UserContext";
import {} from //FaArrowAltCircleDown,
// FaArrowAltCircleLeft,
// FaArrowAltCircleRight,
//FaHome,
//FaShoppingCart,
//FaSignOutAlt,
"react-icons/fa";
//import { AiFillDashboard } from "react-icons/ai";
// import { MdRequestPage, MdViewList } from "react-icons/md";
// import { GiOpenTreasureChest } from "react-icons/gi";
//import { BiLogIn } from "react-icons/bi";
import { useAuth } from "../../context/UserContext";

export const BGNavigator = () => {
  const { signOut, token } = useAuth();

  return (
    <>
      {token ? (
        <nav>
          <div className="navigator">
            <Link to="/">
              <span>Home</span>
            </Link>
          </div>
          <div className="navigator">
            <Link to="/login">
              <span>LogIn</span>
            </Link>
          </div>
          <div className="navigator">
            <Link to="/signup">
              <span>SignUp</span>
            </Link>
          </div>
          <div className="navigator">
            <Link to="/perguntanova">
              <span>Dashboard</span>
            </Link>
          </div>
          <div className="navigator">
            <Link to={`/test/purchases`} onClick={() => {}}>
              <span>Compras</span>
            </Link>
          </div>
          <div className="navigator">
            <Link to="/" onClick={() => signOut()}>
              <span>Salir</span>
            </Link>
          </div>
        </nav>
      ) : (
        <nav>
          <div className="navigator">
            <Link to="/">
              <span>Home</span>
            </Link>
          </div>
          <div className="navigator">
            <Link to="/login">
              <span>LogIn</span>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};
