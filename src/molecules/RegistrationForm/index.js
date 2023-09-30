import React from "react";
import {useState} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";

function RegistrationForm (props){
    const [value, setValue] = useState();
    const {username, email, password} = props;

    return (
        <div className='Form'>
            <div className='FormDiv'>
                <Typography fontWeight='body3' fontSize='title2'>Registration</Typography>
                <label style={{ color: 'white', fontSize: '20px', fontWeight: '400'}}>Name:</label>
                <input
                    value={username}
                    name="name"
                    type="text"
                    onChange={(e) => {setValue(e.target.value)}}
                />
                <label style={{ color: 'white', fontSize: '20px', fontWeight: '400'}}>Password:</label>
                <input
                    value={password}
                    name="password"
                    type="text"
                    onChange={(e) => {setValue(e.target.value)}}
                />
                <label style={{ color: 'white', fontSize: '20px', fontWeight: '400'}}>Email:</label>
                <input
                    value={email}
                    name="email"
                    type="text"
                    onChange={(e) => {setValue(e.target.value)}}
                />
                <div className="RegButtonDiv">
                    <Button title='Back' size='big' borderRadius='small' />
                    <Button title='Sign up' size='big' borderRadius='small' />
                </div>

            </div>
        </div>
    )
}

RegistrationForm.propTypes = {

}
RegistrationForm.defaultProps = {

}


export default RegistrationForm;
