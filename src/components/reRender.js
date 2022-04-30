import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const RenderBtn = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 9999;
    width: 62px;
    height: 62px;
    border-radius: 100px;
    background: #1E1E1E;
    margin: 10px 15px;
    cursor: pointer;
    transition: .2s;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
        background: #313336;
        transform: scale(.95);
        transition: .2s;
    }
    :active {
        background: #0f0f0f;
        transform: scale(.90);
        transition: .2s;
    }
    .icon-img {
        width: 28px;
        height: 28px;
        user-select: none;
        pointer-events: none;
        opacity: 0.7;
        background: url(/rerender.svg) no-repeat center;
        background-size: contain;
    }
`;

const renderBtn = (props) => {
    return (
      <RenderBtn><div className='icon-img'></div></RenderBtn>
    )
}

export default renderBtn;