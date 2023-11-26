import './style.scss';
import {Link} from "react-router-dom";
import Button from "../../atoms/Button";
import React, {useState} from "react";
import FeedbackModal from "../../molecules/FeedbackModal";
import { observer } from 'mobx-react-lite';
import userStore from "../../store";

function HomePage() {
    const [modalActive, setModalActive] = useState(false);


    return (
        <div>
            {/*<h1>Home</h1>*/}
            <div>
                {/*{!userStore.isLogin && (*/}
                {/*    <>*/}
                        <Link to="/registration">Registration</Link>
                        <Link to="/logIn">LogIn</Link>
                {/*    </>*/}
                {/*    )*/}
                {/*}*/}
                {/*<Button title='Leave your feedback' onClick={() => setModalActive(true)} backgrndColor='violet' borderRadius='small' hover='true' size='medium' textColor='white'/>*/}
                {/*<FeedbackModal active={modalActive} setActive={setModalActive}/>*/}

            </div>
        </div>
    );
}

export default observer(HomePage);

