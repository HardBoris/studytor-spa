import { Outlet, Route, Routes } from "react-router-dom";
import { Pruebas } from "../pages/Pruebas";
// import { Home } from "../pages/Home";
// import { Purchases } from "../pages/Purchases";
// import { PurchaseRequisition } from "../pages/Purchases/PurchaseRequisition";
// import { PurchaseOrder } from "../pages/Purchases/PurchaseOrder";
// import { Formato } from "../pages/formato";
// import { Partners } from "../pages/Partners";
// import { Login } from "../pages/Login";
// import { Signup } from "../pages/Signup";

export const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pruebas />} />
      </Routes>
      <Outlet />
    </>
  );
};
