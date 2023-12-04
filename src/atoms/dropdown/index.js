import React, {useState, useEffect} from "react";
import './style.scss';
import Typography from "../Typography";

function Dropdown ({value:outerValue, defaultValue, onChange}) {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const options = ['WHITE_BIT', "BINANCE"]

    const handleChange = (option) => {
        setValue(option)
        setIsActive(false)
    }

    useEffect(() => {
        if(!!outerValue && value !== outerValue){
            setValue(outerValue);
        }
        if(!outerValue){
            setValue(defaultValue)
        }
    }, [outerValue]);

    useEffect(() => {
        if(typeof onChange === 'function'){
            onChange(value);
        }
    }, [value]);
    return(
        <div className='Dropdown'>
            <div className='DropdownBtn' onClick={(e) => setIsActive(!isActive)}>
                <Typography fontWeight='body3' variant='title3' color='white'>
                    {value}
                </Typography>
            </div>
            {isActive && (
            <div className='DropdownContent'>
                {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() =>  handleChange(option)}
                        className='DropdownItem' >
                        {option}
                    </div>
                ))}
            </div>
                )}
        </div>
    )
}

export default Dropdown;
