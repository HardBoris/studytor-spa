import { Outlet, Route, Routes } from "react-router-dom";
//import { Pruebas } from "../pages/Pruebas";
import { PerguntaNova } from "../pages/PerguntaNova";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";

export const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perguntanova" element={<PerguntaNova />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Outlet />
    </>
  );
};
