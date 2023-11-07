import {Routes, Route, Link} from "react-router-dom"
import {useState} from "react";
import HomePage from "../pages/homePage";
import RegistrationPage from "../pages/registrationPage";
import LogInPage from "../pages/LogInPage";
import MainPage from "../pages/MainPage";

function AppRoutes() {
    return (
        <div className="AppRoutesDiv">
            <Routes>
                <Route path="/home" element={<HomePage />}/>
                <Route path="/main" element={<MainPage />}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/logIn" element={<LogInPage/>}/>
                <Route path="*" element={<HomePage/>}/>
            </Routes>
        </div>
    );
}

export default AppRoutes;
