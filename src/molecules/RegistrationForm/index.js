import React from "react";
import {useState, useMemo, useCallback, memo} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";
import LogoMain from "../../atoms/icons/logo1.0.svg";
import { observer } from 'mobx-react-lite';
import userStore from "../../store";

const initialFormData = {
    username: '',
    email: '',
    password: '',
    acceptTC: false,
    deviceType:'WEB'
};

function RegistrationForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [unfilledError, setUnfilledError] = useState(null);
    const navigate = useNavigate();
    const showError = error || unfilledError;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
            acceptTC: event.target.checked
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        // console.log(formData)
        if (!formData.username || !formData.email || !formData.password) {
            setUnfilledError('unfilled error');
            return;
        }
        if (!formData.acceptTC) {
            setError('not checked error');
            return;
        }

        axios.post('/api/v1/auth/register', formData).then((response) => {
            if (response.status === 201) {
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('jwtToken', response.data.jwt);
                userStore.login(response.data.jwt);
                setResponse({
                    username: response.data.username,
                    jwt: response.data.jwt,
                    acceptTC: response.data.acceptTC,
                });

                navigate('/main');
            }
        })
            .catch((error) => {
                setResponse(null);
                setError(error.message);
            });
        setFormData(initialFormData);
    }, [formData, navigate])


    return (
        <div className='FormBlock FormDiv'>
            <div className='RegLogoBlock'>
             <Link to="/home" className="GoBackLink">
                <img src={LogoMain} className='RegLogoImg'/>
             </Link>
             <div className='AccCreate'>
                <Typography fontWeight='body3' variant='title5' color='white'>Create your account</Typography>
             </div>
            </div>
            <form className='FormBlock' onSubmit={handleSubmit}>
                <div className='InputsDiv'>
                <div className='InputBlock'>
                    <InputLabel title='Username'/>
                    <input
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='InputBlock'>
                     <InputLabel title='Email address'/>
                     <input
                         type="email"
                         placeholder="Enter email address"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
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
                    />
                </div>
                    <div className='CheckboxBlock'>
                        <InputLabel for="RealCheckbox" >
                          <input
                            className='RealCheckbox'
                            // required="required"
                            type="checkbox"
                            name="acceptTC"
                            value={formData.acceptTC}
                            onChange={handleChange}
                          />
                            <span className='CustomCheckbox'></span>
                            Accept the terms and conditions
                        </InputLabel>
                    </div>
                </div>
                {showError && (
                    <Typography color='white'>
                        {error ? 'Please accept the terms and conditions' : 'Please fill in all fields'}
                    </Typography>
                )}
                <div className="RegButtonDiv">
                    <Button onSubmit={handleSubmit} title='Register Account' textColor='white' hover='true' size='medium' borderRadius='small' backgrndColor='violet'/>
                </div>
                <div className='AccExistDiv'>
                <Typography fontWeight='body3' fontSize='title2'>Already have an account?</Typography>
                    <Link to="/logIn" className="LogInLink">
                        <Typography fontWeight='body4' fontSize='title2'>Sign in</Typography>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default memo(observer(RegistrationForm));
