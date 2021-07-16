import React from 'react';
import TestCase from '../TestCases/TestCase/TestCase';
import styles from './Results.module.css';

function Results({ results }) {
  return results === null ? (
    <div className={styles.loader}></div>
  ) : (
    <div className={styles.results}>
      {Object.keys(results).length ? (
        <div className={styles.container}>
          <div
            className={`${styles.resultDiv} ${
              styles[
                results.verdict === 'Successfully Executed'
                  ? 'SE'
                  : results.verdict
              ]
            }`}
          >
            <p>{`${results.testCasesCount.passed}/${results.testCasesCount.total} test cases passed.`}</p>
            <p>{`Status: ${results.verdict}`}</p>
          </div>
          {results.verdict === 'CE' ? (
            <div className={styles.error}>
              <h3>Error: </h3>
              <pre>
                <p>{results.stderr}</p>
              </pre>
            </div>
          ) : (
            results.testCasesData.map((result, index) => (
              <TestCase
                verdict={result.verdict}
                testCaseName={` Result ${result.testCaseNo + 1}`}
                testCase={{ ...result, ...result.testCaseInfo }}
                key={`Result ${index + 1}`}
              />
            ))
          )}
        </div>
      ) : (
        <p className={styles.message}>No Results</p>
      )}
    </div>
  );
}

export default Results;

/*



*/
