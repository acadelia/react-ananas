import React from 'react';
import styles from '../styles/auth-style/auth.module.css';

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
  onIconClick?: () => void;
  className?: string; 
  name: string;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, icon, onIconClick, className, name }) => {
  return (
  <div className={styles.login_box}>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={styles.login_input}
      placeholder={name}
      name={name}
    />
    {icon && (
      <img
        src={icon}
        alt="icon"
        className={className}
        onClick={onIconClick}
      />
    )}
  </div>)}
;

export default Input;
