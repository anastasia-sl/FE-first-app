import './style.scss';
import {Link} from "react-router-dom";
import React, {useState} from "react";
import { observer } from 'mobx-react-lite';
import WSLogo from '../../atoms/icons/WS_logo.png'

function HomePage() {
    const [modalActive, setModalActive] = useState(false);


    return (
        <div className='HomePage'>
            <header className='HomePageHeader'>
                <img className='WSLogo' src={WSLogo}/>
                <div className='LoginReg'>
                    <Link to="/logIn" className='LoginRegLink'>Log in</Link>
                    <Link to="/registration" className='LoginRegLink'>Sign up</Link>
                </div>
            </header>
        </div>
    );
}

export default observer(HomePage);

