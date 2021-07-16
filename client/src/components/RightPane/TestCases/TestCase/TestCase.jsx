import React, { useState } from 'react';
import styles from './TestCase.module.css';
import leftArrow from './assets/left-arrow.png';
import more from './assets/more.png';

function SubItem({ displayPropertyName, propertyName, items }) {
  return (
    <div className={styles.subItem}>
      <div className={styles.itemName}>
        <p>{displayPropertyName}</p>
      </div>
      <pre>
        <p className={styles.itemData}>{items[propertyName]}</p>
      </pre>
    </div>
  );
}

// This component can also be used to show the results to the user
function TestCase({ testCaseName, testCase, testCaseCheckedHandler }) {
  const verdict = testCase.verdict;
  const [isOpen, setIsOpen] = useState(false);

  const testCasehandler = () => {
    testCaseCheckedHandler(testCase.testCaseNo);
  };

  return (
    <div className={styles.testCase}>
      <div className={styles.testCaseBar}>
        {verdict ? null : (
          <label className={styles.checkboxContainer}>
            <input
              className={styles.checkBox}
              type="checkbox"
              checked={testCase.checked ? 'checked' : ''}
              onChange={testCasehandler}
            />
          </label>
        )}

        <div
          className={styles.middleSection}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          style={{ border: verdict ? 'none' : '' }}
        >
          <p className={styles.name}>{testCaseName}</p>
          {testCase.verdict && (
            <div
              className={`${styles.verdict} ${
                styles[
                  `verdict--${
                    verdict === 'AC'
                      ? 'green'
                      : verdict === 'WA'
                      ? 'red'
                      : 'orange'
                  }`
                ]
              }`}
            >
              {testCase.verdict}
            </div>
          )}
          <img
            className={`${styles.arrow} ${isOpen ? styles.downArrow : ''}`}
            src={leftArrow}
            alt="Down Arrow"
          />
        </div>

        {verdict ? null : (
          <img className={styles.moreIcon} src={more} alt="More Icon" />
        )}
      </div>
      {isOpen ? (
        <div className={styles.subSection}>
          <SubItem
            displayPropertyName="Input"
            propertyName="input"
            items={testCase}
          />
          {testCase.verdict !== 'RE' ? (
            <SubItem
              displayPropertyName="Output"
              propertyName="output"
              items={testCase}
            />
          ) : null}
          {testCase.expectedOutput && (
            <SubItem
              displayPropertyName="Expected Output"
              propertyName="expectedOutput"
              items={testCase}
            />
          )}
          {testCase.verdict === 'RE' ? (
            <div className={styles.error}>
              <h3>Error: </h3>
              <pre>
                <p>{testCase.stderr}</p>
              </pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default TestCase;
