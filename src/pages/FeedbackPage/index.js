import React from "react";
import {memo} from "react";
import './style.scss';
import FeedbackForm from "../../molecules/FeedbackForm";

function FeedbackPage() {
    return (
        <div>
            <FeedbackForm/>
        </div>
    );
}

export default memo(FeedbackPage);
