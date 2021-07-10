import React from 'react';
import TestCase from './TestCase/TestCase';
import styles from './TestCases.module.css';

function TestCases({ testCases, setTestCases }) {
  const testCaseCheckedHandler = (index) => {
    setTestCases((testCases) => {
      const testCasesCopy = JSON.parse(JSON.stringify(testCases));

      testCasesCopy[index].checked ^= 1;

      return testCasesCopy;
    });
  };

  return (
    <div className={styles.testCases}>
      {testCases.length ? (
        testCases.map((testCase, index) => {
          return (
            <TestCase
              testCaseName={`Test Case ${testCase.testCaseNo + 1}`}
              testCase={testCase}
              key={`Test Case ${index + 1}`}
              testCaseCheckedHandler={testCaseCheckedHandler}
            />
          );
        })
      ) : (
        <p className={styles.message}>No Test Cases</p>
      )}
    </div>
  );
}

export default TestCases;
