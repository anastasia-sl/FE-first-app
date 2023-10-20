import {Routes, Route, Link} from "react-router-dom"
import HomePage from "../pages/homePage";
import RegistrationPage from "../pages/registrationPage";
import LogInPage from "../pages/LogInPage";
import FeedbackPage from "../pages/FeedbackPage";

function AppRoutes() {
    return (
        <div className="AppRoutesDiv">
            <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/logIn" element={<LogInPage/>}/>
                <Route path="/feedback" element={<FeedbackPage/>}/>
                <Route path="*" element={<HomePage/>}/>
            </Routes>
        </div>
    );
}

export default AppRoutes;
