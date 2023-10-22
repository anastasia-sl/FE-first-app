import './style.scss';
import {Link} from "react-router-dom";
import Button from "../../atoms/Button";
import React, {useState} from "react";
import FeedbackModal from "../../molecules/FeedbackModal";

function HomePage() {
    const [openModal, setOpenModal] = useState(true);

    return (
        <div>
            {/*<h1>Home</h1>*/}
            <div>
                {/*<Link to="/home">Home</Link>*/}
                <Link to="/registration">Registration</Link>
                <Link to="/logIn">LogIn</Link>
                <Button title='Leave your feedback' onClick={() => setOpenModal(true)} />
                <FeedbackModal open={openModal} setOpen={setOpenModal}/>
            </div>
        </div>
    );
}

export default HomePage;

