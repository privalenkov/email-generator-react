import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

const AlertStyle = styled.div`
    width: 100%;
    background: #1E1E1E;
    padding: 20px 0;
    margin-top: 10px;
    position: relative;
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
        0% {
            opacity: 0;
            transform: scale(0.9);
        }
        80% {
            transform: scale(1.05);
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        50% {
            transform: scale(1.05);

        }
        80% {
            transform: scale(0.9);
        }
        100% {
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

export const Alert = ({title, dispatch, ...props}) => {
    const [show, setShow] = useState(true);

    const handleClick = () => {
        setShow(false);
        dispatch({
            type: 'REMOVE_ALERT',
            id: props.id
        });
    }

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
            dispatch({
                type: 'REMOVE_ALERT',
                id: props.id
            });
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
                <CloseBtn onClick={handleClick}><div></div></CloseBtn>
            </AlertStyle>
            }
        </Transition>
    );
}