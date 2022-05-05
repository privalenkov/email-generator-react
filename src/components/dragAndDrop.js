import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'

const DndContainer = styled.label`
  border: 1px dashed #C1C1C1;
  box-sizing: border-box;
  border-radius: 25px;
  color: #C0C0C0;
  font-size: 14px;
  height: 74px;
  cursor: pointer;
  padding: 25px 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    position: absolute;
    z-index: -10;
  }
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
  &.accepted {
    transition: all .3s ease-in-out;
    animation: blink .3s forwards;
  }
  &.declined {
    transition: all .3s ease-in-out;
    animation: blink .3s reverse;
  }
  @keyframes blink {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      color: #ffffff;
      background: #363636;
      border: 1px solid #363636;
      transform: scale(1);
    }
  }
`;

export default function FileUploaderDND({ required, accept, id, ...props}) {
    const state = {
        inDropZone: false,
        file: null
    };
    const container = useRef();
    let [req, setReq] = useState(required);

    const reducer = (state, action) => {
        switch (action.type) {
        case 'AddToDropZone':
            return { ...state, inDropZone: action.inDropZone };
        case 'AddToList':
            return { ...state, file: action.file };
        default:
            return state;
        }
    };

    const [data, dispatch] = React.useReducer(reducer, state);

    const handleDragEnter = (event) => {
        event.preventDefault();
        dispatch({ type: 'AddToDropZone', inDropZone: true });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        dispatch({ type: 'AddToDropZone', inDropZone: true });
    };

    const handleDrop = (event) => {
      
      event.preventDefault();
      let file;
      if (event.type === 'drop') { file = event.dataTransfer.files[0] }
      else { 
        file = event.target.files[0]
      }
      
      if (file) {
        dispatch({ type: 'AddToList', file });
        dispatch({ type: 'AddToDropZone', inDropZone: false });
        setReq(false);
      }
    };

    useEffect(() => {
      if (data.file) {
        container.current.classList.add('accepted');
        const file = data.file;
        let blob = file.preview;
        let name = file.name;
        let img = new Image();
        img.src = blob;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          let base64data = reader.result;
          props.changeInputFile({
              name: name,
              path: file.path,
              file: base64data,
              width: img.width,
              height: img.height
          });
        };
      }
    }, [data]);


  return (
    <DndContainer
      ref={container}
      htmlFor={id}
      id="fileuploaderdnd-container"
      className={["fileuploaderdnd-container", req ? "required" : '']}
      onDrop={(event) => handleDrop(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragEnter={(event) => handleDragEnter(event)}
    >
      { data.file ? data.file.name : props.title }
      <input accept={accept} onChange={handleDrop} onClick={() => container.current.classList.remove('accepted')} id={id} type="file"></input>
    </DndContainer>
  );
}