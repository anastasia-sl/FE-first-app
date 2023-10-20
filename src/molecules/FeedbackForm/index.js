import React from "react";
import {useState, useMemo, useCallback, memo} from "react";
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import {Link} from "react-router-dom";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";
import LogoMain from "../../atoms/icons/LOGOMAIN.png";

const initialFormData = {
    username: '',
    feedbackType: '',
    message: '',
    jwtToken: localStorage.getItem('jwtToken'),
};
function FeedbackForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const navig = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        console.log(formData)
        axios.post('/api/v1/feedbacks', formData).then((response) => {
            if (response.status === 200) {
                setError('')
                localStorage.setItem('username', response.data.username);
                setResponse({
                    feedbackType: response.data.feedbackType,
                    message: response.data.message
                });
                navig('/home');
            }
        })
            .catch((error) => {
                setResponse(null);
                setError('Something went wrong. Please try again.');
            });
        setFormData(initialFormData);
    }, [formData, navig])


    return (
            <form className='FormBlock' onSubmit={handleSubmit}>
                <div className=''>
                    <Link to="/home" className="GoBackLink">
                        <img src={LogoMain} className='FeedbackLogoImg'/>
                    </Link>
                </div>
                <div className='InputBlock'>
                    <InputLabel title='Username'/>
                    <input
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="current-username"
                    />
                </div>
                <div className='InputBlock'>
                    <InputLabel title='Message'/>
                    <input
                        type="text"
                        placeholder="Feedback"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>
                <div className=''>
                    <select name="feedbackType" required="required">
                        <option value="">Choose a feedback type</option>
                        <option value={formData.feedbackType}>Bug Report</option>
                        <option value={formData.feedbackType}>Feature request</option>
                        <option value={formData.feedbackType}>Usability Feedback</option>
                        <option value={formData.feedbackType}>General Inquiry</option>
                        <option value={formData.feedbackType}>Security Feedback</option>
                        <option value={formData.feedbackType}>Other</option>
                    </select>
                </div>
                {error && <Typography color='white'>{error}</Typography>}
                <div className="RegButtonDiv">
                    <Button onSubmit={handleSubmit} hover='true' title='Send' size='medium' borderRadius='big' backgrndColor='violet'/>
                </div>
            </form>
    );
}

export default memo(FeedbackForm);
