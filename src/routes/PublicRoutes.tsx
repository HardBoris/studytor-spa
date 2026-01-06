import { Outlet, Route, Routes } from "react-router-dom";
//import { Pruebas } from "../pages/Pruebas";
import { PerguntaNova } from "../pages/PerguntaNova";
import { Home } from "../pages/Home";

export const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perguntanova" element={<PerguntaNova />} />
      </Routes>
      <Outlet />
    </>
  );
};
