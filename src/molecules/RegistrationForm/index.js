import React from "react";
import {useState} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import {Link} from "react-router-dom";
import axios from 'axios';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/v1/auth/register', formData)
            .then((response) => {
                setResponse({
                    username: response.data.username,
                    jwtToken: response.data.jwtToken,
                });
                setError(null);
                console.log("Response from the server:");
                console.log("String username:", response.data.username);
                console.log("String jwtToken(to be changed in upcoming tickets):", response.data.jwtToken);
                console.log(formData);
            })
            .catch((error) => {
                setResponse(null);
                setError(error.message);
            });

        // axios.post('/api/v1/auth/register', formData)
        //     .then((response) => {
        //         setResponse(response.data);
        //         setError(null);
        //         console.log(formData)
        //     })
        //     .catch((error) => {
        //         setResponse(null);
        //         setError(error.message);
        //     });
    }

    return (
        <div>
            <form className='FormBlock' onSubmit={handleSubmit}>
                <Typography fontWeight='body3' fontSize='title2'>Registration</Typography>
                    <label style={{ color: 'white', fontSize: '20px', fontWeight: '400'}}>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
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
            {response && <div>Регистрация успешна: {response}</div>}
            {error && <div>Ошибка: {error}</div>}
        </div>
    );
}

export default RegistrationForm;
