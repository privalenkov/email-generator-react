import React, { useEffect } from 'react';
import styled from 'styled-components'

const DndContainer = styled.label`
  border: 1px dashed #C1C1C1;
  box-sizing: border-box;
  border-radius: 25px;
  color: #C0C0C0;
  font-size: 14px;
  cursor: pointer;
  padding: 25px 20px;
  margin: .5rem 0;
  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    position: absolute;
    z-index: -10;
  }
`;

export default function FileUploaderDND(props) {
    const state = {
        inDropZone: false,
        file: null
    };

    const reducer = (state, action) => {
        switch (action.type) {
        case 'AddToDropZone':
            return { ...state, inDropZone: action.inDropZone };
        case 'AddToList':
            return { ...state, file: state.file };
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
        
        file = URL.createObjectURL(file);
        
        console.log(file)
        if (file) {
          dispatch({ type: 'AddToList', file });
          dispatch({ type: 'AddToDropZone', inDropZone: false });
        }
    };

    useEffect(() => {
      if (data.file) {
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
                file: base64data,
                width: img.width,
                height: img.height
            });
          };
      }
    }, [data]);

  return (
    <DndContainer
      htmlFor="file-input"
      id="fileuploaderdnd-container"
      className="fileuploaderdnd-container"
      onDrop={(event) => handleDrop(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragEnter={(event) => handleDragEnter(event)}
    >
      { data.file  ? console.log(data.file) : props.title }
      <input onChange={handleDrop} id="file-input" type="file"></input>
    </DndContainer>
  );
}