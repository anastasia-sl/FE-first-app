import React, {useState, useEffect} from "react";
import './style.scss';
import Typography from "../Typography";

function Dropdown ({defaultValue, onChange}) {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const options = ['WhiteBIT', 'other']

    const handleChange = (option) => {
        setValue(option)
        setIsActive(false)
    }

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
                {options.map(option => (
                    <div
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
