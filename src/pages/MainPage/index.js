import './style.scss';
import Button from "../../atoms/Button";
import React, {useState} from "react";
import FeedbackModal from "../../molecules/FeedbackModal";
import { observer } from 'mobx-react-lite';
import {ReactComponent as FeedbackIcon} from '../../atoms/icons/feedbackIcon.svg';

function MainPage() {
    const [modalActive, setModalActive] = useState(false);

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

