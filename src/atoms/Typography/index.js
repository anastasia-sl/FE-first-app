import React from "react";
import PropTypes from "prop-types";
import './style.scss';
import cn from 'classnames';
function Typography (props){
    const {variant, color, filling, textCase, fontWeight} = props;
    return (
        <p className={cn('AppTypography', {
            'SizeTitle1': variant === 'title1',
            'SizeTitle2': variant === 'title2',
            'SizeTitle3': variant === 'title3',
            'SizeTitle4': variant === 'title4',
            'SizeTitle5': variant === 'title5',
            'FontWeightBody1': fontWeight === 'body1',
            'FontWeightBody2': fontWeight === 'body2',
            'FontWeightBody3': fontWeight === 'body3',
            'FontWeightBody4': fontWeight === 'body4',
            'TextColorWhite': color === 'white',
            'TextColorBlack': color === 'black',
            'TextColorLightGrey': color === 'lightGrey',
            'TextColorDarkGrey': color === 'darkGrey',
            'NoFilling': filling === 'none',
            'FillingWhite': filling === 'white',
            'FillingGrey': filling === 'grey',
            'FillingBlack': filling === 'black',
            'TextCaseLower': textCase === 'lower',
            'TextCaseNormal': textCase === 'normal',
            'TextCaseUpper': textCase === 'upper',
        })}>{props.children}</p>
    )}

Typography.propTypes = {
    fontWeight:PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.oneOf(['white', 'black', 'lightGrey', 'darkGrey']),
    filling: PropTypes.oneOf(['none', 'white', 'grey', 'black']),
    textCase: PropTypes.oneOf(['lower', 'normal', 'upper']),
}

Typography.defaultProps = {
    color:'lightGrey',
    filling:'none',
    textCase:'normal',
    fontWeight:'body3',
}

export default Typography;
