import React, { useState, useEffect } from 'react';
import Results from './Results/Results';
import TestCases from './TestCases/TestCases';
import styles from './RightPane.module.css';

function RightPane({ resultsState, testCases, results, setTestCases }) {
  const [selected, setSelected] = useState('testcases');

  useEffect(() => {
    let newState = '';
    if (resultsState === 'selected' || resultsState === 'loading')
      newState = 'results';
    else newState = 'testcases';

    setSelected(newState);
  }, [resultsState]);

  return (
    <div className={styles.rightPane}>
      <div className={styles.rightPaneTopBar}>
        <div
          className={`${styles.btn} ${
            selected === 'testcases' ? styles.btnSelected : ''
          }`}
          onClick={() => setSelected('testcases')}
        >
          <p>Test Cases</p>
        </div>
        <div
          className={`${styles.btn} ${
            selected === 'results' ? styles.btnSelected : ''
          }`}
          onClick={() => setSelected('results')}
        >
          <p>Results</p>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        {selected === 'testcases' ? (
          <TestCases testCases={testCases} setTestCases={setTestCases} />
        ) : (
          <Results resultsState={resultsState} results={results} />
        )}
      </div>
      <div className={styles.rightPaneBottomBar}>
        <button>Add Test Case</button>
        <button>Delete Selected</button>
      </div>
    </div>
  );
}

export default React.memo(RightPane);
