import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Institution } from "../pages/Institution";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
//import { PerguntaNova } from "../pages/PerguntaNova";
import { useAuth } from "../context/UserContext";
import { Index } from "../pages/Index";

export const PrivateRoutes = () => {
  const { institution } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/novoinstituto" element={<Institution />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path={"/" + institution.institutionId} element={<Index />} />
      </Routes>
      <Outlet />
    </>
  );
};
