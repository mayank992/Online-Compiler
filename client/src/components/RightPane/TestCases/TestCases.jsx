import React from 'react';
import TestCase from './TestCase/TestCase';
import styles from './TestCases.module.css';

function TestCases({ testCases }) {
  return (
    <div className={styles.testCases}>
      {testCases.map((testCase, index) => {
        return (
          <TestCase
            testCaseName={`Test Case ${index + 1}`}
            testCase={testCase}
            key={`Test Case ${index + 1}`}
          />
        );
      })}
    </div>
  );
}

export default TestCases;
