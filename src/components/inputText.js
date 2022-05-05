import React from "react";
import styled from 'styled-components';

const InputContainerSyle = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    &.required {
        ::after {
            content: '';
            background: #da3458;
            width: 5px;
            height: 5px;
            opacity: .5;
            border-radius: 2px;
            position: absolute;
            right: 15px;
        }
    }
`;
const InputTextSyle = styled.input`
    border: none;
    placeholder-color: #fff;
    padding: 12px 20px;
    width: 100%;
    border-radius: 25px;
    margin: .3rem 0;
    background: #F2F2F2;
    color: #737373;
    ::placeholder {
        color: #C0C0C0;
    }
    outline: none;
`;
const InputDefault = ({value, onChange, placeholder, type, required, ...props}) => {
    let req = required;

    if(value) req = false;
    return (
        <InputContainerSyle {...props} className={req ? 'required': ''}>
            <InputTextSyle type={type} value={ value } onChange={onChange} placeholder={placeholder}></InputTextSyle>
        </InputContainerSyle>
    );
};

export default InputDefault;