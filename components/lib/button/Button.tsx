import React from 'react';
import styles from './Button.module.scss';

type ButtondProps = {
  text: string;
  disabled?: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtondProps> = ({ text, disabled, onClick }) => {
  return (
    <button
      className={`h-10 px-2 ${styles.button}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
