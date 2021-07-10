import React, { useState } from 'react';
import Results from './Results/Results';
import TestCases from './TestCases/TestCases';
import Modal from '../Extras/Modal/Modal';
import InputTestCase from './InputTestCase/InputTestCase';
import styles from './RightPane.module.css';

function RightPane({
  resultsState,
  setResultsState,
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
            resultsState === 'not-selected' ? styles.btnSelected : ''
          }`}
          onClick={() => setResultsState('not-selected')}
        >
          <p>Test Cases</p>
        </div>
        <div
          className={`${styles.btn} ${
            resultsState === 'selected' || resultsState === 'loading'
              ? styles.btnSelected
              : ''
          }`}
          onClick={() => setResultsState('selected')}
        >
          <p>Results</p>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        {resultsState === 'not-selected' ? (
          <TestCases testCases={testCases} setTestCases={setTestCases} />
        ) : (
          <Results resultsState={resultsState} results={results} />
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
