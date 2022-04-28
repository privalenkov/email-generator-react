import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export const IFrame = ({
  children,
  ...props
}) => {
    const [contentRef, setContentRef] = useState(null)
    let mountNode = contentRef?.contentWindow?.document?.body;
    return (
      <iframe {...props} ref={setContentRef} title="template">
          {mountNode && createPortal(children, mountNode)}
      </iframe>
    )
}