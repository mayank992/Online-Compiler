import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ children, className, style }) => {
  const elRef = useRef(null);

  if (!elRef.current) elRef.current = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    elRef.current.className = className ? className : '';
    elRef.current.setAttribute('style', style ? style : '');
    return () => modalRoot.removeChild(elRef.current);
  });

  return createPortal(<>{children}</>, elRef.current);
};

export default Modal;
