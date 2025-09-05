import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

const Portal = ({ children, containerId = 'modal-root' }) => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    let containerElement = document.getElementById(containerId);
    
    if (!containerElement) {
      containerElement = document.createElement('div');
      containerElement.id = containerId;
      containerElement.style.position = 'fixed';
      containerElement.style.top = '0';
      containerElement.style.left = '0';
      containerElement.style.zIndex = '9999999';
      containerElement.style.pointerEvents = 'none';
      document.body.appendChild(containerElement);
    }
    
    setContainer(containerElement);
    
    return () => {
      if (containerElement && containerElement.parentNode) {
        containerElement.parentNode.removeChild(containerElement);
      }
    };
  }, [containerId]);

  if (!container) return null;

  return createPortal(children, container);
};

export default Portal;
