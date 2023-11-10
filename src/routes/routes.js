import {Routes, Route, Link, Navigate} from "react-router-dom"
import {useState} from "react";
import HomePage from "../pages/homePage";
import RegistrationPage from "../pages/registrationPage";
import LogInPage from "../pages/LogInPage";
import MainPage from "../pages/MainPage";
import AuthGuard from "../guards/AuthGuard";

function AppRoutes() {
    return (
        <div className="AppRoutesDiv">
            <Routes>
                <Route path="/home" element={<HomePage />}/>
                <Route path="/main" element={<AuthGuard component={<MainPage />} />} />
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/logIn" element={<LogInPage/>}/>
                <Route path="*" element={<Navigate to="/main" replace />} />
            </Routes>
        </div>
    );
}

export default AppRoutes;
