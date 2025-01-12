import React, {useState} from 'react';
import classNames from "classnames";
import styles from "./Input.module.scss";
import Icon from "@/components/icon/Icon";

const Input = ({
                   id,
                   label,
                   name = '',
                   labelVisible,
                   icon,
                   email,
                   password,
                   placeholder = '',
                   readOnly,
                   disabled,
                   value,
                   error: errorProp,
                   className = '',
                   onChange,
                   ...restProps //이외는 restProps 에 들어가도록 함
               }) => {
    const [inputValue, setInputValue] = useState(value ? value : '');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);   // 비밀번호 보기를 눌렀는지 아닌지 확인
    const checkType = () => {
        if(email) {
            return 'email'
        }

        if(password) {
            return isPasswordVisible ? 'text' : 'password';
        }

        return 'text';
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
        onChange(e)
    }

    const iconType = isPasswordVisible ? 'show' : 'hide';
    const iconLabel = `비밀번호 ${isPasswordVisible ? '표시' : '감춤'}`

    return (
        <div className={classNames(styles.formControl, className)}>
            <label //input 을 위한 label
                htmlFor={id}
                className={classNames(styles.label, labelVisible || styles.labelHidden)}
            >
                {label}
            </label>

            <div className={classNames(styles.inputWrapper, errorProp && styles.inputWrapperError)}>
                {icon ? <Icon type={icon}/> : null}
                <input
                    id={id}
                    type={checkType()}
                    name={name}
                    className={classNames(styles.input)}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    value={inputValue}
                    onChange={handleChange}
                    {...restProps}
                />

                {password ? (
                    <button
                        type='button'
                        className={styles.button}
                        onClick={() => setIsPasswordVisible(prev => !prev)} // true 일때는 false, false 일때는 true
                        disabled={disabled}
                    >
                        <Icon type={iconType} alt={iconLabel} title={iconLabel} />
                    </button>
                ) : null}
            </div>
            {errorProp && (
                <span role='alert' className={styles.error}>
                    {errorProp.message}
                </span>
            )}
        </div>
    );
};

export default Input;