import React, { useState } from "react";
import './App.css';
import styled from 'styled-components';
import Template from './components/template.js';
import Settings from './components/settings.js';

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
  width: 10px;
  margin: 8px;
  border-radius: 100px;
  height: 10px;
  background: #e04264;
  cursor: pointer;
`

function App() {
  const ipc = window.api
  const [data, setData] = useState(null);
  const handleData = (data) => setData(data)
  const handle = () => ipc.send('toMain', 'closeApp')
  return (
    <div className="App">
      <Header><CloseBtn onClick={handle} className="closeBtn"></CloseBtn></Header>
      <div className="view">
        <Settings setData={ handleData }/>
        <Template data={ data }/>
      </div>
    </div>
  );
}

export default App;
