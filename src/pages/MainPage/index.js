import './style.scss';
import {useNavigate} from "react-router-dom";
import Button from "../../atoms/Button";
import React, {useState} from "react";
import FeedbackModal from "../../molecules/FeedbackModal";
import { observer } from 'mobx-react-lite';
import userStore from "../../store";
import {ReactComponent as FeedbackIcon} from '../../atoms/icons/feedbackIcon.svg';


function MainPage() {
    const [modalActive, setModalActive] = useState(false);
    const navigate = useNavigate();
    const jwtToken = userStore.jwt;

    if (jwtToken) {
        const tokenData = JSON.parse(atob(jwtToken.split('.')[1]));
        const currentTime = Date.now() / 1000;

        if (tokenData.exp && tokenData.exp < currentTime) {
            userStore.logout()
            navigate('/home');
        }

    } else {
        navigate('/home')
    }
        return (
            <div className='MainPage'>
                <div className='FeedbackButtonBlock'>
                    <Button onClick={() => setModalActive(true)} backgrndColor='violet' borderRadius='circle' hover='hoverCircle' >
                        <FeedbackIcon className='FeedbackIcon'/>
                    </Button>
                </div>
                <div className='FeedbackFormBlock'>
                    <FeedbackModal active={modalActive} setActive={setModalActive}/>
                </div>

            </div>
        );
    }


export default observer(MainPage);

