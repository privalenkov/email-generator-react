import React, { useEffect } from 'react';
import styled from 'styled-components'

const DndContainer = styled.div`
  border: 1px dashed #C1C1C1;
  box-sizing: border-box;
  border-radius: 25px;
  color: #C0C0C0;
  font-size: 14px;
  padding: 25px 20px;
  cursor: pointer;
  margin: .5rem 0;
`;

export default function FileUploaderDND(props) {
    const state = {
        inDropZone: false,
        fileList: []
    };

    const reducer = (state, action) => {
        switch (action.type) {
        case 'AddToDropZone':
            return { ...state, inDropZone: action.inDropZone };
        case 'AddToList':
            return { ...state, fileList: state.fileList.concat(action.files) };
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

        let files = [...event.dataTransfer.files];
        let files_with_preview = [];

        files.map((file, index) => {
        file[`image_${index}`] = URL.createObjectURL(file);
        files_with_preview.push(file);
        });

        if (files) {
        dispatch({ type: 'AddToList', files });
        dispatch({ type: 'AddToDropZone', inDropZone: false });
        }
    };

    useEffect(() => {
    if (data.fileList[0]) {
        const latestImage = data.fileList[data.fileList.length - 1];
        let blob = latestImage.preview;
        let name = latestImage.name;
        let img = new Image();
        img.src = blob;

        let reader = new FileReader();
        reader.readAsDataURL(latestImage);
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
      id="fileuploaderdnd-container"
      className="fileuploaderdnd-container"
      onDrop={(event) => handleDrop(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragEnter={(event) => handleDragEnter(event)}
    >
      <div className="fileuploaderdnd-container-button">
        <div className="fileuploaderdnd-container-text">
          { props.title }
        </div>
      </div>
    </DndContainer>
  );
}