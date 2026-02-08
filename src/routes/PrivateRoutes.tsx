import { Outlet, Route, Routes } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Institution } from "../pages/Institution";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/novoinstituto" element={<Institution />} />
      </Routes>
      <Outlet />
    </>
  );
};
