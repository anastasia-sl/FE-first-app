import React, { useEffect, useState } from 'react'; // Import useState here
import { useNavigate } from "react-router-dom";
import userStore from '../store';

const AuthGuard = ({component}) => {
    
    const [modalActive, setModalActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkToken()
    }, [component]);

    const checkToken = async () => {

        const jwtToken = userStore.jwt;

        if (jwtToken) {
            const tokenData = JSON.parse(atob(jwtToken.split('.')[1]));
            const currentTime = Date.now() / 1000;
    
            if (tokenData.exp && tokenData.exp < currentTime) {
                userStore.logout()
                navigate('/home')
            }
    
        } else {
            userStore.logout()
            navigate('/home')
        }
    }

    return <React.Fragment>{component}</React.Fragment>
}

export default AuthGuard;