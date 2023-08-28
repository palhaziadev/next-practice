import React from 'react';
import styles from './Button.module.scss';
import { BaseComponent } from '@/types';
import cn from 'classnames';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum ButtonSize {
  Small = 'small',
  Normal = 'normal',
}

type ButtonProps = {
  text: string;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtonProps & BaseComponent> = ({
  text,
  type = ButtonType.Primary,
  size = ButtonSize.Normal,
  disabled,
  onClick,
  className,
}) => {
  const buttonClasses = cn(
    className,
    styles.button,
    styles[type],
    styles[size]
  );
  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
