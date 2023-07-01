import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SingInPage from "./SingIn/SingInPage";
import LoginPage from "./LogIn/LoginPage";
import MainPage from "./MainPage/MainPage";
import ConfirmCodePage from "./ForgotPassword/ConfirmCodePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/logIn" element={<LoginPage />} />
      <Route path="/singIn" element={<SingInPage />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/forgotPassword" element={<ConfirmCodePage />} />
      <Route path="*" element={<Navigate to="/logIn" />} />
    </Routes>
  );
};

export default AppRoutes;
