import React, { FC, MouseEvent } from "react";
import { observer } from 'mobx-react-lite';
import userStore from "../../store";
import { ReactComponent as CheckIcon } from '../../atoms/icons/checkIcon.svg';
import Typography from "../Typography";
import './style.scss';

interface SuccessPopupProps {
    activeGrateful: boolean;
    setActiveGrateful: (active: boolean) => void;
}

const SuccessPopup: FC<SuccessPopupProps> = ({ activeGrateful, setActiveGrateful }) => {
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setActiveGrateful(false);
    };

    return (
        <div className={activeGrateful ? "OverlayActive" : "Overlay"} onClick={handleClick}>
            <div className='SuccessPopup'>
                <div className='SuccessPopupContent'>
                    {/*<div className='SuccessIconBlock'>*/}
                    {/*    <CheckIcon className='SuccessIcon' />*/}
                    {/*</div>*/}
                    <Typography color='darkGreen' fontWeight='body3' variant='title3'>
                        You have successfully added a new integration
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default observer(SuccessPopup);
