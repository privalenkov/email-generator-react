import React, { useState  } from "react";
import './App.css';
import styled from 'styled-components';
import Template from './components/template.js';
import Settings from './components/settings.js';
import RenderBtn from './components/reRender.js';


const Header = styled.header`
  width: 100%;
  background: #1E1E1E;
  height: 25px;
  cursor: pointer;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const CloseBtn = styled.div`
  width: 14px;
  margin: 8px;
  border-radius: 100px;
  height: 14px;
  background: #e04264;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 8px;
    height: 8px;
    background: url(./close-alert.svg) no-repeat;
    background-size: contain;
    opacity: 0.3;
  }
`

function App() {
  const ipc = window.api;
  const [data, setData] = useState(null);
  const handleData = (data) => setData(data)
  const handle = () => ipc.send('toMain', 'closeApp');

  return (
    <div className="App">
      <Header><CloseBtn onClick={handle} className="closeBtn"><div></div></CloseBtn></Header>
      <div className="view">
        <Settings setData={ handleData }/>
        <Template data={ data }/>
      </div>
      <RenderBtn />
    </div>
  );
}

export default App;
