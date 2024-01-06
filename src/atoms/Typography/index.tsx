import React, { ReactNode, FC } from "react";
import './style.scss';
import cn from 'classnames';

interface TypographyProps {
    fontWeight?: string;
    variant?: string;
    color?: 'white' | 'black' | 'lightGrey' | 'darkGrey' | 'violet' | 'darkGreen';
    filling?: 'none' | 'white' | 'grey' | 'black';
    textCase?: 'lower' | 'normal' | 'upper';
    children?: ReactNode;
}

const Typography: FC<TypographyProps> = ({
    variant,
    color = 'lightGrey',
    filling = 'none',
    textCase = 'normal',
    fontWeight = 'body3',
    children,
   }) => {
    return (
        <p className={cn('AppTypography', {
            'SizeTitle1': variant === 'title1',
            'SizeTitle2': variant === 'title2',
            'SizeTitle3': variant === 'title3',
            'SizeTitle4': variant === 'title4',
            'SizeTitle5': variant === 'title5',
            'SizeTitle6': variant === 'title6',
            'FontWeightBody1': fontWeight === 'body1',
            'FontWeightBody2': fontWeight === 'body2',
            'FontWeightBody3': fontWeight === 'body3',
            'FontWeightBody4': fontWeight === 'body4',
            'TextColorWhite': color === 'white',
            'TextColorBlack': color === 'black',
            'TextColorViolet': color === 'violet',
            'TextColorLightGrey': color === 'lightGrey',
            'TextColorDarkGrey': color === 'darkGrey',
            'TextColorDarkGreen': color === 'darkGreen',
            'NoFilling': filling === 'none',
            'FillingWhite': filling === 'white',
            'FillingGrey': filling === 'grey',
            'FillingBlack': filling === 'black',
            'TextCaseLower': textCase === 'lower',
            'TextCaseNormal': textCase === 'normal',
            'TextCaseUpper': textCase === 'upper',
        })}>{children}</p>
    );
};

export default Typography;
