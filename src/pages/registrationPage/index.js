import './style.scss';
import RegistrationForm from "../../molecules/RegistrationForm";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function RegistrationPage() {
    return (
        <div className='RegistrationPageDiv'>
            <RegistrationForm />
        </div>
    );
}

export default RegistrationPage;
