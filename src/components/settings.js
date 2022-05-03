import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import FileUploaderDND from './dragAndDrop';
import { AlertContext } from './alert/alertProvider';
import { v4 } from "uuid";

const SettingsPanel = styled.div`
    padding: .5rem 1rem;
    overflow-x: hidden;
    min-width: 230px;
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #c4c4c4;
        border-radius: 20px;
    }
`;
const InputText = styled.input`
    border: none;
    placeholder-color: #fff;
    padding: 12px 20px;
    background: #F2F2F2;
    color: #737373;
    width: auto;
    border-radius: 25px;
    margin: .3rem 0;
    ::placeholder { iii
        color: #C0C0C0;
    }
    outline: none;
`;

const Title = styled.div`
    font-size: 13px;
    line-height: 25px;
    margin-top: 20px;
    font-weight: 700;
    color: #1E1E1E;
    text-align: left;
`
const ButtonCHIMP = styled.button`
    border:none;
    margin-right: 10px;
    cursor: pointer;
    width: 100%;
    padding: 15px 17px;
    text-align: center;
    font-weight: 700;
    font-size: 10px;
    background: #1E1E1E;
    color: #fff;
    border-radius: 25px;
    transition: background .1s;
    :hover {
        transition: background .1s;
        background: #313336;
    }
    :active {
        background: #0f0f0f;
    }
`;
const ButtonDownload = styled.button`
    border:none;
    margin-left: 10px;
    cursor: pointer;
    padding: 15px 17px;
    text-align: center;
    font-weight: 700;
    font-size: 10px;
    color: #fff;
    width: 100%;
    transition: background .1s;
    background: #6592E6;
    border-radius: 25px;
    :hover {
        transition: background .1s;
        background: #7698d6;
    }
    :active {
        transition: background .1s;
        background: #406ec5;
    }
`
const BtnContainer = styled.div`
    display: flex;
    margin-top: 15px;
`
const Settings = props => {
    const dispatch = useContext(AlertContext);
    const [file, setFile] = useState(null);
    const handleDrop = (file) => {
        console.log(file);
        setFile(file);
    }

    const [themeName, setThemeName] = useState("");
    const handleThemeName = (e) => {
        setThemeName(e.target.value)
    }

    const handleBtn = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_ALERT',
            payload: {
                id: v4(),
                title: 'Notification',
                type: 'WARNING',
            }
        })
    }
    
    useEffect(() => {
        
        console.log(themeName)
        props.setData({themeName});
        
    }, [themeName]);
    return (
        <SettingsPanel>
            <InputText type="text" value={ themeName } onChange={handleThemeName} placeholder="Theme Name"></InputText>
            <InputText placeholder="Image Header Subtitle" style={{marginBottom: '15px'}}></InputText>
            <FileUploaderDND title="Upload screen.jpg" changeInputFile={handleDrop}>
                <div>{ file }</div>
            </FileUploaderDND>
            <Title>Header Image Font</Title>
            <InputText value="1.2" placeholder="Font Size" type="number"  style={{marginBottom: '-1px'}}></InputText>
            <FileUploaderDND title="Upload font-regular" changeInputFile={handleDrop}>
                <div>{ file }</div>
            </FileUploaderDND>
            <FileUploaderDND title="Upload font-bold" changeInputFile={handleDrop}>
                <div>{ file }</div>
            </FileUploaderDND>
            <InputText value="0" placeholder="Seed" type="number"  style={{marginTop: '15px'}}></InputText>
            <BtnContainer>
                <ButtonCHIMP>TO MCHIMP</ButtonCHIMP>
                <ButtonDownload onClick={handleBtn}>DOWNLOAD</ButtonDownload>
            </BtnContainer>
        </SettingsPanel>
    );
};

export default Settings;