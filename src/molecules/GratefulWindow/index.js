import React from "react";
import {useState, useMemo, useCallback, memo} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";

function GratefulWindow({active, setActive}) {

    return (
        <div className={active ? "OverlayActive" : "Overlay"} onClick={() => setActive(false)}>
            <form className='FeedbackGratefulWindow' onClick={e => e.stopPropagation()}>
                <div className='GratefulWindowContent'>

                </div>
            </form>
        </div>
    );
}

export default memo(GratefulWindow);
