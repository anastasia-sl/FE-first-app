import React, {useState} from "react";
import {memo} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import { observer } from 'mobx-react-lite';
import userStore from "../../store";
import {ReactComponent as CheckIcon} from '../../atoms/icons/checkIcon.svg';

function GratefulWindow({activeGrateful, setActiveGrateful}) {

    return (
    <div className={activeGrateful ? "OverlayActive" : "Overlay"} onClick={() => setActiveGrateful(false)}>
        <div className='FeedbackGratefulWindow'>
            <div className='GratefulWindowContent'>
                <div className='CheckIconBlock'>
                    <CheckIcon className='CheckIcon'/>
                </div>
                <Typography color='white' fontWeight='body3' variant='title6'>
                    Thank you {userStore.username} for your feedback!
                </Typography>
            </div>
        </div>
    </div>
    );
}

export default memo(observer(GratefulWindow));
