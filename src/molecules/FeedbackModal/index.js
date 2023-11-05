import React from "react";
import {useState, useMemo, useCallback, memo} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";
import LogoMain from "../../atoms/icons/LOGOMAIN.png";
import { observer } from 'mobx-react-lite';
import userStore from "../../store";
import GratefulWindow from "../GratefulWindow";

const initialFormData = {
    feedbackType: '',
    message: '',
    jwt: localStorage.getItem('jwtToken'),
};
function FeedbackModal({active, setActive}) {
    const [formData, setFormData] = useState(initialFormData);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value,
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        // if (!formData.message || !formData.feedbackType) {
        //     setError('error');
        //     return;
        // }
        axios.post('/api/v1/feedbacks', formData).then((response) => {
            console.log(formData)
            if (response.status === 200) {
                sessionStorage.setItem('feedbackType', response.data.feedbackType);
                sessionStorage.setItem('message', response.data.message);
                // setActive(false)
                setError(null)

                setResponse({
                    feedbackId: response.data.feedbackId,
                    userId: response.data.userId,
                    status: response.data.status
                });
                return <GratefulWindow />
            }
        })
            .catch((error) => {
                setResponse(null);
                setError('Something went wrong. Please try again.');
            });
        setFormData(initialFormData);
    }, [formData])

    return (
        <div className={active ? "OverlayActive" : "Overlay"} onClick={() => setActive(false)}>
            <form className='FeedbackModalContainer' onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
                <div className='FeedbackModalContent'>
                    <div className='FeedbackLogoBlock'>
                        <div className="GoBackLink">
                            <img src={LogoMain} className='FeedbackLogoImg'/>
                        </div>
                        <div className='FeedbackModalTitle'>
                            <Typography fontWeight='body3' variant='title5' color='white'>Send us your feedback!</Typography>
                        </div>
                    </div>
                    <div className='InputBlock'>
                        <InputLabel title='Message'/>
                        <textarea
                            placeholder="Leave your feedback"
                            name="message"
                            value={formData.message}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='FeedbackSelection'>
                        <InputLabel title='Choose a feedback type '/>
                        <div className='SelectWrapper'>
                            <select name="feedbackType" required="required" onChange={handleChange} className='Select'>
                                <option value="" data-style="option-style-1" disabled selected>Feedback type </option>
                                <option value="BUG_REPORT" >Bug Report</option>
                                <option value="FEATURE_REQUEST">Feature request</option>
                                <option value="USABILITY_FEEDBACK">Usability Feedback</option>
                                <option value="GENERAL_INQUIRY">General Inquiry</option>
                                <option value="SECURITY_FEEDBACK">Security Feedback</option>
                                <option value="OTHER">Other</option>
                            </select>
                            <i className='ArrowIcon' aria-hidden='true'></i>
                        </div>
                    </div>
                    {error && <Typography color='white'>{error}</Typography>}
                    <div className="SendFeedbackButton">
                        <Button onSubmit={handleSubmit} hover='true' title='Send' size='medium' borderRadius='small' backgrndColor='violet' textColor='white'/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default memo(observer(FeedbackModal));
