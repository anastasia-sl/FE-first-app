import React from "react";
import {useState, useMemo, useCallback, memo} from "react";
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import {Link} from "react-router-dom";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";
import LogoMain from "../../atoms/icons/logo1.0.svg";
import userStore from '../../store';

const initialFormData = {
    username: '',
    password: '',
    deviceType:'WEB'
};
function LoginForm() {
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
        // console.log(formData)
        axios.post('/api/v1/auth/login', formData).then((response) => {
            if (response.status === 200) {
                setError('')
                localStorage.setItem('jwtToken', response.data.jwt);
                userStore.login(response.data.jwt);
                setResponse({
                    username: response.data.username,
                    email: response.data.email,
                    userRole: response.data.userRole,
                    jwtToken: response.data.jwt,
                });
                navig('/main');
            }
        })
            .catch((error) => {
                setResponse(null);
                setError('Invalid username or password. Please try again.');
            });
        setFormData(initialFormData);
    }, [formData, navig])


    return (
        <div>
            <form className='FormBlock' onSubmit={handleSubmit}>
                <div className='LoginLogoBlock'>
                    <Link to="/home" className="GoBackLink">
                        <img src={LogoMain} className='RegLogoImg'/>
                    </Link>
                    <div className='WelcomeBackText'>
                        <Typography fontWeight='body3' variant='title5' color='white'>Welcome Back</Typography>
                    </div>
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
                    <InputLabel title='Password'/>
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                </div>
                {error && <Typography color='white'>{error}</Typography>}
                <div className="RegButtonDiv">
                    <Button onSubmit={handleSubmit} hover='true' title='Login' textColor='white' size='medium' borderRadius='small' backgrndColor='violet'/>
                </div>
                <div className='AccExistDiv'>
                    <Typography fontWeight='body3' fontSize='title2'>Don't have an account?</Typography>
                    <Link to="/registration" className="LogInLink">
                        <Typography fontWeight='body4' fontSize='title2'>Sign up</Typography>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default memo(LoginForm);
