import { Size, Color, Type, Variant } from '../types';
import { Button } from 'antd';

interface Button {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    size?: Size;
    color?: Color;
    variant?: Variant;
    htmlType?: 'button' | 'submit' | 'reset';
    children?: React.ReactNode;
    danger?: boolean;
    type?: Type;
    icon?: React.ReactNode;
}

export default function ButtonDefault({ 
    onClick, 
    size = 'medium', 
    color = 'blue', 
    htmlType = 'button',
    danger = false,
    type = 'primary',
    variant,
    icon,
    children 
}: Button) {

    return (
        <Button
            icon={icon}
            variant={variant}
            onClick={onClick}
            size={size}
            color={color}     
            danger={danger}
            htmlType={htmlType}
            type={type} 
        >
            {children}
        </Button>
    );
}