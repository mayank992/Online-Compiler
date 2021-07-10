import React, { useState, useEffect, useRef } from 'react';
import styles from './CodeEditor.module.css';
import settingIcon from './assets/setting.png';
import resetIcon from './assets/reset.png';
import Menu from '../Extras/Menu/Menu';
import upArrow from './assets/up-arrow.png';
import logo from './assets/logo.png';

function LineNumber({ number }) {
  return <p className={styles.lineNumber}>{number}</p>;
}

function CodeEditor({
  runAll,
  runSelected,
  code,
  setCode,
  language,
  setLanguage,
  supportedLanguages,
}) {
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [caretPosition, setCaretPosition] = useState(0);
  const [lineNumbers, setLineNumbers] = useState();
  const lineNumbersDiv = useRef(null);
  const textArea = useRef(null);
  let isSyncingLeftScroll = false;
  let isSyncingRightScroll = false;

  useEffect(() => {
    textArea.current.selectionStart = caretPosition;
    textArea.current.selectionEnd = caretPosition;
  }, [caretPosition]);

  useEffect(() => {
    const newLineNumbers = [];
    for (let i = 0; i < numberOfLines; i++) {
      newLineNumbers.push(<LineNumber number={i + 1} key={i + 1} />);
    }
    setLineNumbers(newLineNumbers);
  }, [numberOfLines]);

  const codeChangeHandler = (e) => {
    e.preventDefault();

    setNumberOfLines((numberOfLines, { target } = e) => {
      let value = target.value;
      let oldNumberOfLines = numberOfLines - 1;
      let newNumberOfLines = value.split('\n').length - 1;

      if (oldNumberOfLines < newNumberOfLines)
        return numberOfLines + (newNumberOfLines - oldNumberOfLines);

      return numberOfLines - (oldNumberOfLines - newNumberOfLines);
    });

    setCaretPosition(e.target.selectionStart);

    setCode(e.target.value);
  };

  const scrollHandlerLineDiv = (e) => {
    if (!isSyncingLeftScroll) {
      isSyncingRightScroll = true;
      textArea.current.scrollTop = e.target.scrollTop;
    }
    isSyncingLeftScroll = false;
  };

  const scrollHandlerTextBox = (e) => {
    if (!isSyncingRightScroll) {
      isSyncingLeftScroll = true;
      lineNumbersDiv.current.scrollTop = e.target.scrollTop;
    }
    isSyncingRightScroll = false;
  };

  const languageChangeHandler = (e) => {
    e.stopPropagation();

    if (e.target.innerText === language) return;
    setLanguage(e.target.innerText);
  };

  const handleTabKeyPress = (e) => {
    if (e.key !== 'Tab') return;

    e.preventDefault();
    e.stopPropagation();

    const selectionStart = e.target.selectionStart;

    setCode(
      code.substring(0, selectionStart) +
        '    ' +
        code.substring(selectionStart)
    );

    setCaretPosition(e.target.selectionStart + 4);
  };

  return (
    <div className={styles.editorRoot}>
      <div className={styles.editorTopBar}>
        <img className={styles.logo} src={logo} alt="logo" />
      </div>
      <div className={styles.codeEditor}>
        <div
          className={styles.lineNumbers}
          ref={lineNumbersDiv}
          onScroll={scrollHandlerLineDiv}
        >
          {lineNumbers}
        </div>
        <textarea
          wrap="off"
          ref={textArea}
          spellCheck="false"
          className={styles.codeArea}
          onScroll={scrollHandlerTextBox}
          value={code}
          onChange={codeChangeHandler}
          placeholder="Write your code here..."
          onKeyDown={handleTabKeyPress}
        ></textarea>
      </div>
      <div className={styles.editorBottomBar}>
        <img
          className={styles.settingIcon}
          src={settingIcon}
          alt="Setting Icon"
        />
        <img
          onClick={() => setCode('')}
          className={styles.resetIcon}
          src={resetIcon}
          alt="Reset Icon"
        />
        <div onClick={languageChangeHandler}>
          <Menu options={supportedLanguages}>
            <img className={styles.upArrow} src={upArrow} alt="Up Arrow" />
            {language}
          </Menu>
        </div>
        <button className={styles.runSelected} onClick={runSelected}>
          Run Selected
        </button>
        <button onClick={runAll}>Run All</button>
      </div>
    </div>
  );
}

export default React.memo(CodeEditor);
