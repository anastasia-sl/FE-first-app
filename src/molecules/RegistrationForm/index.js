import React from "react";
import {useState, useMemo, useCallback, memo} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import {Link} from "react-router-dom";
import axios from 'axios';

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
                    <label style={{ color: 'white', fontSize: '20px', fontWeight: '400'}}>Name</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label style={{ color: 'white', fontSize: '20px', fontWeight: '400'}}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label style={{ color: 'white', fontSize: '20px', fontWeight: '400'}}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                {/*<button type="submit">Зарегистрироваться</button>*/}
                <div className="RegButtonDiv">
                     <Link to="/home" className="GoBackLink">
                         <Button title='Back' size='big' borderRadius='small' />
                    </Link>
                    <Button onSubmit={handleSubmit} title='Sign up' size='big' borderRadius='small' />
                </div>
            </form>
            {!!response && <div>Регистрация успешна: {JSON.stringify(response)}</div>}
            {!!error && <div>Ошибка: {JSON.stringify(error)}</div>}
        </div>
    );
}

export default memo(RegistrationForm);
