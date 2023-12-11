import React, {useEffect} from "react";
import {useState, useCallback, memo} from "react";
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import axios from 'axios';
import InputLabel from "../../atoms/FormInputLabel";
import LogoMain from "../../atoms/icons/LOGOMAIN.png";
import {ReactComponent as EyeIcon} from '../../atoms/icons/eyeIcon.svg';
import ClosedEyeIcon from '../../atoms/icons/closedEyeIcon.png'
import {ReactComponent as PlusIcon} from '../../atoms/icons/plusIcon.svg';
import { observer } from 'mobx-react-lite';
import Dropdown from "../../atoms/dropdown";
import './style.scss';
import SuccessPopup from "../../atoms/SuccessPopup";

const getInitialFormData = () => {
    return {
        apiKeysReq: {
            publicKey: '',
            secretKey: ''
        },
        balanceName: '',
        code: '',
    }
};
const initialFormData = getInitialFormData();
function IntegrationRegModal({active, setActive}) {
    const [formData, setFormData] = useState(initialFormData);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [isGratefulWindowOpen, setIsGratefulWindowOpen] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPrivateKey(!showPrivateKey);
    };

    const formChange = (field, value) => {
        const nextFormData = {...formData}

        if(field.includes(".")){
            const path = field.split(".");
            nextFormData[path[0]][path[1]] = value;
        } else{
            nextFormData[field] = value;
        }
        setFormData(nextFormData);
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        formChange(name, value);
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        axios.post('/api/v1/exchangers/api-keys', formData, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).then((response) => {
            if ([200, 201].includes(response.status)) {
                setActive(false);
                setError(null);
                setIsGratefulWindowOpen(true);

                setResponse({
                    balanceId: response.data.balanceId,
                    userId: response.data.userId,
                    status: response.data.status
                });
                const nextFormData = getInitialFormData();
                setFormData(nextFormData);
             }
        })
            .catch((error) => {
                setResponse(null);
                setError('Something went wrong. Please try again.');
            });
    }, [formData]);

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
                                name="apiKeysReq.publicKey"
                                value={formData.apiKeysReq.publicKey}
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
                                    name="apiKeysReq.secretKey"
                                    value={formData.apiKeysReq.secretKey}
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
                        <div className='InputBlock DropdownInput'>
                            <InputLabel title='Code'/>
                            <Dropdown defaultValue="Code" onChange={(value) => formChange('code', value)} value={formData.code}/>
                        </div>
                        {error && <Typography color='white'>{error}</Typography>}
                        <div className="AddIntegrBtn">
                            <Button onSubmit={handleSubmit} hover='true' borderRadius='circle' backgrndColor='violet' textColor='white'>
                                <PlusIcon className='AddIntegrIcon' />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            {isGratefulWindowOpen && (
                <SuccessPopup activeGrateful={isGratefulWindowOpen} setActiveGrateful={setIsGratefulWindowOpen} onClose={() => setIsGratefulWindowOpen(false)} /> // Передайте функцію для закриття GratefulWindow
            )}
        </>
    );
}

export default memo(observer(IntegrationRegModal));
