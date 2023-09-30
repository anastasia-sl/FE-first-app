import './style.scss';
import {Link} from "react-router-dom";

function MainPage() {
    return (
        <div>
            <Link to="/home">Home</Link>
            <Link to="/registration">Registration</Link>
        </div>
    );
}

export default MainPage;

