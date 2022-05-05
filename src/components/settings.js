import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import FileUploaderDND from './dragAndDrop';
import InputText from "./inputText";

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
    padding: 15px 0;
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
    padding: 15px 0;
    text-align: center;
    font-weight: 700;
    font-size: 10px;
    color: #fff;
    width: 50%;
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
    const [fileIMG, setFileIMG] = useState(null);
    const handleDropImg = (file) => {
        setFileIMG(file.path);
    }
    const [fileFontReg, setFileFontReg] = useState(null);
    const handleDropFontReg = (file) => {
        setFileFontReg(file.path);
    }
    const [fileFontBold, setFileFontBold] = useState(null);
    const handleDropFontBold = (file) => {
        setFileFontBold(file.path);
    }

    const [themeName, setThemeName] = useState('');
    const handleThemeName = (e) => {
        setThemeName(e.target.value)
    }

    const [subtitle, setSubtitle] = useState('');
    const handleSubtitle = (e) => {
        setSubtitle(e.target.value)
    }

    const handleBtn = (e) => {
        e.preventDefault();
    }
    
    useEffect(() => {
        props.setData({themeName, subtitle, fileIMG, fileFontReg, fileFontBold});
    }, [themeName, subtitle, fileIMG, fileFontReg, fileFontBold]);
    return (
        <SettingsPanel>
            <InputText required type="text" value={ themeName } onChange={handleThemeName} placeholder="Theme Name"></InputText>
            <InputText required type="text" value={ subtitle } onChange={handleSubtitle} placeholder="Image Header Subtitle" style={{marginBottom: '15px'}}></InputText>
            <FileUploaderDND required accept=".png, .jpeg, .jpg" id="input-header" title="Upload screen.jpg" changeInputFile={handleDropImg}>
                { fileIMG }
            </FileUploaderDND>
            <Title>Header Image Font</Title>
            <InputText placeholder="Font Size" type="number" style={{marginBottom: '-1px'}}></InputText>
            <div style={{margin: '5px'}}></div>
            <FileUploaderDND accept=".ttf" id="input-font-regular"  title="Upload font-regular" changeInputFile={handleDropFontReg}>
                { fileFontReg }
            </FileUploaderDND>
            <div style={{margin: '5px'}}></div>
            <FileUploaderDND accept=".ttf" id="input-font-bold"  title="Upload font-bold" changeInputFile={handleDropFontBold}>
                { fileFontBold }
            </FileUploaderDND>
            <InputText placeholder="Seed" type="number" style={{marginTop: '15px'}}></InputText>
            <BtnContainer>
                <ButtonCHIMP>UPLOAD TO MCHIMP</ButtonCHIMP>
                <ButtonDownload onClick={handleBtn}>SAVE</ButtonDownload>
            </BtnContainer>
        </SettingsPanel>
    );
};

export default Settings;