import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

const AlertStyle = styled.div`
    width: 100%;
    background: #1E1E1E;
    padding: 20px 0;
    text-align: left;
    color: #ffffff;
    border-radius: 10px;
    &.entering {
        animation: fadeIn .3s forwards;
    }
    &.exiting {
        animation: fadeOut .3s forwards;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
const CloseBtn = styled.div`
    width: 14px;
    height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 6px;
    top: 0;
    right: 0;
    position: absolute;
    background: #fff;
    color: #737373;
    border-radius: 10px;
    div {
        background: url(/close-alert.svg) no-repeat center;
        width: 6px;
        height: 6px;
    }
`;

const AlertText = styled.div`
    font-size: 13px;
    font-weight: 700;
    padding-left: 20px;
`;

export const Alert = ({title, ...props}) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 5000);
    }, []);

    return (
        <Transition
            in={ show }
            timeout={ 300 }
            mountOnEnter
            unmountOnExit
        >
            {state => <AlertStyle className={state}>
                <AlertText>{title}</AlertText>
                <CloseBtn onClick={() => setShow(false)}><div></div></CloseBtn>
            </AlertStyle>
            }
        </Transition>
    );
}