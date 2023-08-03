import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, disabled, onClick }) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
