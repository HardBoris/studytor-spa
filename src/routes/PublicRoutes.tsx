import { Outlet, Route, Routes } from "react-router-dom";
import { Pruebas } from "../pages/Pruebas";
import { PerguntaNova } from "../pages/PerguntaNova";

export const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pruebas />} />
        <Route path="/perguntanova" element={<PerguntaNova />} />
      </Routes>
      <Outlet />
    </>
  );
};
