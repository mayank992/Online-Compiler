import React, { useState } from 'react';
import styles from './InputTestCase.module.css';

function InputTestCase({ toggleInput, addTestCase }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const addTestCaseHandler = () => {
    addTestCase({ input, output });
  };

  return (
    <div className={styles.testCaseInput}>
      <div className={styles.topBar}>
        <div className={styles.exitSign} onClick={toggleInput}>
          X
        </div>
      </div>
      <div className={styles.bodySection}>
        <label>
          <div>Input</div>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Enter input here..."
          />
        </label>
        <label>
          <div>Output</div>
          <textarea
            onChange={(e) => setOutput(e.target.value)}
            value={output}
            placeholder="Enter output here..."
          />
        </label>
      </div>
      <div className={styles.bottomSection}>
        <button onClick={addTestCaseHandler}>Add Test Case</button>
      </div>
    </div>
  );
}

export default InputTestCase;
