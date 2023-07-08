import React from 'react';
import styles from './InputField.module.scss';

type InputFieldProps = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  value,
  placeholder,
  disabled = false,
  onChange,
}) => {
  return (
    <div className={`flex px-2 ${styles.container}`}>
      <input
        type="text"
        className={`${styles.field}`}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
