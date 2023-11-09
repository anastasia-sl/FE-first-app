import React from "react";
import {useState, useCallback, memo} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";
import LogoMain from "../../atoms/icons/LOGOMAIN.png";
import { observer } from 'mobx-react-lite';
import GratefulWindow from "../GratefulWindow";

const initialFormData = {
    feedbackType: '',
    message: '',
};
function FeedbackModal({active, setActive}) {
    const [formData, setFormData] = useState(initialFormData);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isGratefulWindowOpen, setIsGratefulWindowOpen] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        // if (!formData.message || !formData.feedbackType) {
        //     setError('error');
        //     return;
        // }
        axios.post('/api/v1/feedbacks', formData, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).then((response) => {
            console.log(formData)
            if (response.status === 201) {
                setIsGratefulWindowOpen(true);
                setActive(false);
                setError(null)


                setResponse({
                    feedbackId: response.data.feedbackId,
                    userId: response.data.userId,
                    status: response.data.status
                })
            }
        })
            .catch((error) => {
                setResponse(null);
                setError('Something went wrong. Please try again.');
            });
        setFormData(initialFormData);


    }, [formData])

    return (<>
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
                            <select name="feedbackType" required="required" onChange={handleChange} className='Select' defaultValue={"default"}>
                                <option value="default" data-style="option-style-1" disabled>Feedback type </option>
                                <option value="BUG_REPORT" >Bug Report</option>
                                <option value="FEATURE_REQUEST">Feature request</option>
                                <option value="USABILITY_FEEDBACK">Usability Feedback</option>
                                <option value="GENERAL_INQUIRY">General Inquiry</option>
                                <option value="SECURITY_FEEDBACK">Security Feedback</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                    </div>
                    {error && <Typography color='white'>{error}</Typography>}
                    <div className="SendFeedbackButton">
                        <Button onSubmit={handleSubmit} hover='true' title='Send' size='medium' borderRadius='small' backgrndColor='violet' textColor='white'/>
                    </div>

                </div>
            </form>
        </div>
            {isGratefulWindowOpen && (
                <GratefulWindow activeGrateful={isGratefulWindowOpen} setActiveGrateful={setIsGratefulWindowOpen} onClose={() => setIsGratefulWindowOpen(false)} /> // Передайте функцію для закриття GratefulWindow
            )}
        </>
    );
}

export default memo(observer(FeedbackModal));
