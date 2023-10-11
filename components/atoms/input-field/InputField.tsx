import React from 'react';
import styles from './InputField.module.scss';

type InputFieldProps = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  value,
  placeholder,
  disabled = false,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.field}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => onKeyDown?.(e)}
      />
    </div>
  );
};

export default InputField;
