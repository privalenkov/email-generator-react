import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #F4F6F8 0%, #F4F6F8 100%);
  div {
    width: 123px;
    height: 86px;
    user-select: none;
    pointer-events: none;
    opacity: 0.5;
    background: url(/icon-png.png) no-repeat center;
  }
`;

const FrameContainer = styled.div`
  iframe {
    user-select: none;
  }
`;

export const IFrame = ({
  children,
  settingsData,
  ...props
}) => {
    const ipc = window.api;
    const contentRef = useRef(null);
    let [mountNode, setMountNode] = useState(null);
    let [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
      contentRef.current.src="/template.html";
    }, []);

    
    ipc.receive('fromMain', (data) => {
      if (!data) return setIsLoad(false);
      setMountNode(contentRef?.current?.contentWindow?.document?.body);
      setIsLoad(true);
    })
  
    return (
      <FrameContainer>
        {!isLoad && <ImageContainer><div></div></ImageContainer>}
        <iframe style={{display: !isLoad && 'none' }} {...props} ref={contentRef} title="template">
            { isLoad && createPortal(children, mountNode) }
        </iframe>
      </FrameContainer>
    )
}