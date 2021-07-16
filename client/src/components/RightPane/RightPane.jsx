import React, { useState } from 'react';
import Results from './Results/Results';
import TestCases from './TestCases/TestCases';
import Modal from '../Extras/Modal/Modal';
import InputTestCase from './InputTestCase/InputTestCase';
import styles from './RightPane.module.css';

function RightPane({
  rightPaneState,
  setRightPaneState,
  testCases,
  results,
  setTestCases,
  addTestCase,
}) {
  const [showTestCaseInput, setShowTestCaseInput] = useState(0);

  const toggleInput = () => {
    setShowTestCaseInput(!showTestCaseInput);
  };

  const addTestCaseHandler = (testCase) => {
    toggleInput();
    addTestCase(testCase);
  };

  return (
    <div className={styles.rightPane}>
      <div className={styles.rightPaneTopBar}>
        <div
          className={`${styles.btn} ${
            rightPaneState === 'test-cases' ? styles.btnSelected : ''
          }`}
          onClick={() => setRightPaneState('test-cases')}
        >
          <p>Test Cases</p>
        </div>
        <div
          className={`${styles.btn} ${
            rightPaneState === 'results' ? styles.btnSelected : ''
          }`}
          onClick={() => setRightPaneState('results')}
        >
          <p>Results</p>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        {rightPaneState === 'test-cases' ? (
          <TestCases testCases={testCases} setTestCases={setTestCases} />
        ) : (
          <Results results={results} />
        )}
      </div>
      <div className={styles.rightPaneBottomBar}>
        <button onClick={toggleInput}>Add Test Case</button>
        <button>Delete Selected</button>
      </div>
      {showTestCaseInput ? (
        <Modal>
          <InputTestCase
            toggleInput={toggleInput}
            addTestCase={addTestCaseHandler}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default React.memo(RightPane);
