import React from "react";
import {useState, useMemo, useCallback, memo} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import {Link} from "react-router-dom";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";

function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }, []);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        console.log(formData)
        axios.post('/api/v1/auth/register', formData).then((response) => {
            if (response.status === 201) {
                localStorage.setItem('username', response.data.jwtToken);
                localStorage.setItem('jwtToken', response.data.username);
                setResponse({
                    username: response.data.username,
                    jwtToken: response.data.jwtToken,
                });
            }
        })
            .catch((error) => {
                setResponse(null);
                setError(error.message);
                console.log("Response from the server:", error);
            });
    }, [formData])


    return (
        <div>
            <form className='FormBlock' onSubmit={handleSubmit}>
                <Typography fontWeight='body3' fontSize='title2'>Registration</Typography>
                <div className='RegBlock'>
                    <div className='RegLabels'>
                        <InputLabel title='Username'/>
                        <InputLabel title='Email'/>
                        <InputLabel title='Password'/>
                    </div>
                    <div className='InputsBlock'>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="RegButtonDiv">
                     <Link to="/home" className="GoBackLink">
                         <Button title='Back' size='medium' borderRadius='noBorder' backgrndColor='violet' border=''/>
                    </Link>
                    <Button onSubmit={handleSubmit} title='Sign up' size='medium' borderRadius='noBorder' backgrndColor='violet'/>
                </div>
                <div className='AccExistDiv'>
                <Typography fontWeight='body3' fontSize='title2'>Already have an account?</Typography>
                    <Link to="/logIn" className="LogInLink">
                        <Typography fontWeight='body3' fontSize='title2'>Sign in</Typography>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default memo(RegistrationForm);
