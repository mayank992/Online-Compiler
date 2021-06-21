import React, { useState, useRef } from 'react';
import styles from './Menu.module.css';
import Modal from '../Modal/Modal';

function Menu({ children, position, options }) {
  const [showMenu, setShowMenu] = useState(false);
  const optionBtn = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((showMenu) => !showMenu);
  };

  return (
    <>
      <button
        className={styles.optionsBtn}
        ref={optionBtn}
        onClick={toggleMenu}
      >
        {children}
      </button>
      {showMenu ? (
        <Modal
          className={styles.Menu}
          style={`left: ${
            optionBtn.current.getBoundingClientRect().left
          }px; bottom: 60px;`}
        >
          {options.map((option) => {
            return (
              <button key={option} onClick={() => setShowMenu(false)}>
                {option}
              </button>
            );
          })}
        </Modal>
      ) : null}
    </>
  );
}

export default Menu;
