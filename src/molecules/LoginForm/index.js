import React from "react";
import {useState, useMemo, useCallback, memo} from "react";
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import {Link} from "react-router-dom";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";
import WSLogo from "../../atoms/icons/WS_logo.png";

const initialFormData = {
    username: '',
    password: '',
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
        console.log(formData)
        axios.post('/api/v1/auth/login', formData).then((response) => {
            if (response.status === 200) {
                setError('')
                localStorage.setItem('jwtToken', response.data.username);
                setResponse({
                    username: response.data.username,
                    email: response.data.email,
                    userRole: response.data.userRole,
                    jwtToken: response.data.jwtToken,
                });
                navig('/home');
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
                <Link to="/home" className="GoBackLink">
                    <Typography fontWeight='body3' fontSize='title2'>Back</Typography>
                    <img src={WSLogo} className='RegLogoImg'/>
                </Link>
                <Typography fontWeight='body3' variant='title5' color='white'>Welcome Back</Typography>
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
                    <Button onSubmit={handleSubmit} title='Login' size='medium' borderRadius='small' backgrndColor='violet'/>

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
