import { Outlet, Route, Routes } from "react-router-dom";
//import { Pruebas } from "../pages/Pruebas";
//import { PerguntaNova } from "../pages/PerguntaNova";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
//import { Signup } from "../pages/Signup";
//import { Institution } from "../pages/Institution";

export const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Outlet />
    </>
  );
};
