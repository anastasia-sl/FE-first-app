import {Routes, Route, Link} from "react-router-dom"
import HomePage from "../pages/homePage";
import RegistrationPage from "../pages/registrationPage";
import NotFoundPage from "../pages/notFoundPage";

function AppRoutes() {
    return (
        <div className="AppRoutesDiv">
            <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default AppRoutes;
