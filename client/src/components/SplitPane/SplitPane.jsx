import React, { useState } from 'react';
import styles from './SplitPane.module.css';

function SplitPane({ left, right }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [leftPaneWidth, setLeftPaneWidth] = useState(window.innerWidth * 0.65);

  const handleDrag = (e) => {
    e.preventDefault();
    if (!isMouseDown) return;

    setLeftPaneWidth(e.clientX);
  };

  return (
    <div
      className={`${styles.splitPane} ${
        isMouseDown ? styles.cursorColResize : ''
      }`}
      onMouseMove={handleDrag}
      onMouseUp={() => (isMouseDown ? setIsMouseDown(false) : null)}
    >
      <div className={styles.leftPane} style={{ width: `${leftPaneWidth}px` }}>
        {left}
      </div>
      <div
        className={styles.seperator}
        onMouseDown={() => setIsMouseDown(true)}
      />
      <div className={styles.rightPane}>{right}</div>
    </div>
  );
}

export default SplitPane;
