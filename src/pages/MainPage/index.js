import './style.scss';
import {Link, useNavigate} from "react-router-dom";
import Button from "../../atoms/Button";
import React, {useState} from "react";
import FeedbackModal from "../../molecules/FeedbackModal";
import { observer } from 'mobx-react-lite';
import userStore from "../../store";

function MainPage() {
    const [modalActive, setModalActive] = useState(false);
    const navigate = useNavigate();
    const jwtToken = userStore.jwt;

    if (jwtToken) {
        const tokenData = JSON.parse(atob(jwtToken.split('.')[1]));
        const currentTime = Date.now() / 1000;

        if (tokenData.exp && tokenData.exp < currentTime) {
            navigate('/home');

        }

    }
        return (
            <div className='MainPage'>
                <div>
                    <Button title='Leave your feedback' onClick={() => setModalActive(true)} backgrndColor='violet'
                            borderRadius='small' hover='true' size='medium' textColor='white'/>
                    <FeedbackModal active={modalActive} setActive={setModalActive}/>
                </div>
            </div>
        );
    }


export default observer(MainPage);

