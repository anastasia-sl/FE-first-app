import React, { FC, ReactNode } from "react";
import './style.scss';
import cn from 'classnames';

interface ButtonProps {
    backgrndColor?: 'white' | 'violet' | 'none';
    textColor?: 'white' | 'black' | 'orange';
    shadow?: boolean;
    borderRadius?: 'none' | 'small' | 'big' | 'circle';
    title?: string;
    border?: string;
    hover?: 'true' | 'hoverCircle';
    size?: 'small' | 'medium' | 'big';
    stat?: {
        target: string;
        eventType: string;
        count: number;
    };
    children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
    backgrndColor = 'orange',
    textColor = 'black',
    shadow = false,
    borderRadius = 'none',
    title,
    border,
    hover,
    size,
    stat,
    children,
    ...baseProps
   }) => {
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
            'BorderRadiusCircle': borderRadius === 'circle',
            'SizeSmall': size === 'small',
            'SizeMedium': size === 'medium',
            'SizeBig': size === 'big',
            'Hover': hover === 'true',
            'HoverCircle': hover === 'hoverCircle',
        })}
                {...baseProps}
        >
            {title}
            {' '}
            {children}
        </button>
    );
};

export default Button;
