import React from 'react';
import styles from './Button.module.scss';
import { BaseComponent } from '@/types';
import cn from 'classnames';

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtonProps & BaseComponent> = ({
  text,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      className={cn(className, styles.button)}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
