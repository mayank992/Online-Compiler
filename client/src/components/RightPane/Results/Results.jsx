import React from 'react';
import TestCase from '../TestCases/TestCase/TestCase';
import styles from './Results.module.css';

function Results({ resultsState, results }) {
  return resultsState === 'loading' ? (
    <div className={styles.loader}></div>
  ) : (
    <div className={styles.results}>
      {results.length ? (
        results.map((result, index) => (
          <TestCase
            verdict={result.verdict}
            testCaseName={` Result ${result.testCaseNo + 1}`}
            testCase={result}
            key={`Result ${index + 1}`}
          />
        ))
      ) : (
        <p className={styles.message}>No Results</p>
      )}
    </div>
  );
}

export default Results;
