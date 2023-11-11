import React from "react";
import {useState, useCallback, memo} from "react";
import './style.scss';
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";
import LogoMain from "../../atoms/icons/LOGOMAIN.png";
import {ReactComponent as EyeIcon} from '../../atoms/icons/eyeIcon.svg';
// import {ReactComponent as ClosedEyeIcon} from '../../atoms/icons/closedEyeIcon.png';
import ClosedEyeIcon from '../../atoms/icons/closedEyeIcon.png'
import { observer } from 'mobx-react-lite';

const initialFormData = {
    publicKey: '',
    privateKey: '',
    balanceName: '',
    code: '',
};
function IntegrationRegModal({active, setActive}) {
    const [formData, setFormData] = useState(initialFormData);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [showPrivateKey, setShowPrivateKey] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPrivateKey(!showPrivateKey);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        axios.post('/api/v1/exchangers/api-keys', formData, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).then((response) => {
            console.log(formData)
            if (response.status === 201) {
                setActive(false);
                setError(null)

                setResponse({
                    balanceId: response.data.balanceId,
                    userId: response.data.userId,
                    status: response.data.status
                })
            }
        })
            .catch((error) => {
                setResponse(null);
                setError('Something went wrong. Please try again.');
            });
        setFormData(initialFormData);


    }, [formData])

    return (<>
            <div className={active ? "OverlayActive" : "Overlay"} onClick={() => setActive(false)}>
                <form className='IntegrModalContainer' onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
                    <div className='IntegrModalContent'>
                        <div className='LogoBlock'>
                            <div className="GoBackLink">
                                <img src={LogoMain} className='IntegrLogoImg'/>
                            </div>
                            <div className='IntegrModalTitle'>
                                <Typography fontWeight='body3' variant='title5' color='white'>Add your balance</Typography>
                            </div>
                        </div>
                        <div className='InputBlock'>
                            <InputLabel title='Enter keys'/>
                            <input
                                className='Input'
                                placeholder="Public key"
                                name="publicKey"
                                value={formData.publicKey}
                                type='text'
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className='InputBlock'>
                            <InputLabel />
                            <div className='PrivateKeyContainer'>
                                <input
                                    className='InputPrivate'
                                    placeholder="Private key"
                                    name="privateKey"
                                    value={formData.privateKey}
                                    type={showPrivateKey ? 'text' : 'password'}
                                    required
                                    onChange={handleChange}
                                />
                                {!showPrivateKey && <img src={ClosedEyeIcon} className='ClosedEyeIcon' onClick={handleTogglePasswordVisibility}/>}
                                {showPrivateKey && <EyeIcon className='EyeIcon' onClick={handleTogglePasswordVisibility}/>}
                            </div>
                        </div>
                        <div className='InputBlock'>
                            <InputLabel title='Enter balance name'/>
                            <input
                                className='Input'
                                placeholder="Balance name"
                                name="balanceName"
                                value={formData.balanceName}
                                type='text'
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className='IntegrSelection'>
                            <InputLabel title='Code'/>
                            <div className='SelectWrapper'>
                                <select name="code" required="required" onChange={handleChange} className='Select' defaultValue={"default"}>
                                    <option value="default" data-style="option-style-1" disabled>Code</option>
                                    <option value="WHITE_BIT" >WhiteBIT</option>
                                </select>
                            </div>
                        </div>
                        {error && <Typography color='white'>{error}</Typography>}
                        <div className="AddIntegrBtn">
                            <Button onSubmit={handleSubmit} hover='true' title='Add' size='medium' borderRadius='small' backgrndColor='violet' textColor='white'/>
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
}

export default memo(observer(IntegrationRegModal));
