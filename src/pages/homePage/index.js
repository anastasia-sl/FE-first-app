import './style.scss';
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <div>
            {/*<h1>Home</h1>*/}
            <div>
                {/*<Link to="/home">Home</Link>*/}
                <Link to="/registration">Registration</Link>
                <Link to="/logIn">LogIn</Link>
            </div>
        </div>
    );
}

export default HomePage;

