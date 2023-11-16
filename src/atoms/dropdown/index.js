import React, {useState} from "react";
import './style.scss';
import Typography from "../Typography";

function Dropdown ({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false);
    const options = ['WhiteBIT', 'other']

    return(
        <div className='Dropdown'>
            <div className='DropdownBtn' onClick={(e) => setIsActive(!isActive)}>
                <Typography fontWeight='body3' variant='title3' color='white'>
                    {selected}
                </Typography>
            </div>
            {isActive && (
            <div className='DropdownContent'>
                {options.map(option => (
                    <div
                        onClick={(e) => {
                         setSelected(option)
                         setIsActive(false)
                     }}
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
