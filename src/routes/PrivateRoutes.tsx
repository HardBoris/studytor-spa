import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Institution } from "../pages/Institution";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
//import { PerguntaNova } from "../pages/PerguntaNova";
import { useAuth } from "../context/UserContext";
import { Dashboard } from "../pages/Dashboard";
import { PerguntaNova } from "../pages/PerguntaNova";

export const PrivateRoutes = () => {
  const { institution } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/novoinstituto" element={<Institution />} />
        <Route
          path={"/" + institution.institutionId + "/perguntanova"}
          element={<PerguntaNova />}
        />
        <Route
          path="*"
          element={<Navigate to={"/" + institution.institutionId} replace />}
        />
        <Route path={"/" + institution.institutionId} element={<Dashboard />} />
      </Routes>
      <Outlet />
    </>
  );
};
