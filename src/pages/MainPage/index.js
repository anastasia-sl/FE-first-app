import './style.scss';
import Button from "../../atoms/Button";
import React, {useState} from "react";
import FeedbackModal from "../../molecules/FeedbackModal";
import { observer } from 'mobx-react-lite';
import {ReactComponent as FeedbackIcon} from '../../atoms/icons/feedbackIcon.svg';
import {ReactComponent as PlusIcon} from '../../atoms/icons/plusIcon.svg';
import IntegrationRegModal from "../../molecules/IntegrationRegModal";
import Typography from "../../atoms/Typography";

function MainPage() {
    const [modalActive, setModalActive] = useState(false);
    const [integrModalActive, setIntegrModalActive] = useState(false);

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
                <div className='AddIntegrButton'>
                    <Button onClick={() => setIntegrModalActive(true)} backgrndColor='violet' borderRadius='small' size='medium' hover='true' >
                        <PlusIcon className='AddIntegrIcon'/>
                        <Typography color='white' size='title6' fontWeight='body3'>Add Balance</Typography>
                    </Button>
                </div>
                <div>
                    <IntegrationRegModal active={integrModalActive} setActive={setIntegrModalActive}/>
                </div>
            </div>
        );
    }


export default observer(MainPage);

