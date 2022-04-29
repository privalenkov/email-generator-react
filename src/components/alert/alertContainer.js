import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from './alert';

const AlertContainerStyle = styled.div`
    width: 280px;
    position: absolute;
    top: 25px;
    margin-top: 10px;
    right: 25px;
`;

export const AlertContainer = props => {
    return (
        <AlertContainerStyle>
            <Alert title="EDASD"></Alert>
        </AlertContainerStyle>
    );
}