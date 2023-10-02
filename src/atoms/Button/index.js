import React from "react";
import PropTypes from "prop-types";
import './style.scss';
import cn from 'classnames';
function Button (props){
    const {backgrndColor, textColor, shadow, borderRadius, border, title, children, size, stat, ...baseProps} = props;

    return (
        <button className={cn('AppButton', {
            'BackgroundColorWhite': backgrndColor === 'white',
            'BackgroundColorViolet': backgrndColor === 'violet',
            'BackgroundColorNone': backgrndColor === 'none',
            'TextColorWhite': textColor === 'white',
            'TextColorBlack': textColor === 'black',
            'TextColorOrange': textColor === 'orange',
            'Shadow': shadow,
            'NoBorder': border === 'noBorder',
            'BorderRadiusSmall': borderRadius === 'small',
            'BorderRadiusBig': borderRadius === 'big',
            'SizeSmall': size === 'small',
            'SizeMedium': size === 'medium',
            'SizeBig': size === 'big',
        })}
                {...baseProps}>
            {title}
            {' '}
            {children}
        </button>
    )
}

Button.propTypes = {
    backgrndColor:PropTypes.oneOf(['white', 'violet', 'none']),
    textColor: PropTypes.oneOf(['white', 'black', 'orange']),
    shadow: PropTypes.bool,
    borderRadius: PropTypes.oneOf(['none', 'small', 'big']),
    title: PropTypes.string,
    border: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'big']),
    stat: PropTypes.shape({
        target: PropTypes.string,
        eventType: PropTypes.string,
        count: PropTypes.number,
    })
}
Button.defaultProps = {
    backgrndColor:'orange',
    textColor:'black',
    shadow: false,
    borderRadius:'none',
    size: 'medium',
    stat:{
        target:null,
        eventType:null,
        count: null
    },
}


export default Button;
