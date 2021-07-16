import React, { useState } from 'react';
import axios from 'axios';
import SplitPane from './components/SplitPane/SplitPane';
import RightPane from './components/RightPane/RightPane';
import CodeEditor from './components/CodeEditor/CodeEditor';
import './App.css';

const supportedLanguages = ['C', 'C++'];
const languageAPIMapping = {
  C: 'c',
  'C++': 'cpp',
};

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('C++');
  const [testCases, setTestCases] = useState([]);
  const [results, setResults] = useState({});
  const [rightPaneState, setRightPaneState] = useState('test-cases');

  const runCode = (testCases) => {
    if (!testCases.length) {
      setRightPaneState('results');
      setResults({});
      return;
    }

    const options = {
      url: `${window.location.protocol}//one-compiler.herokuapp.com/run`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {
        code,
        language: languageAPIMapping[language],
        testCases,
      },
    };

    setResults(null);
    setRightPaneState('results');

    axios(options).then((response) => {
      setRightPaneState('results');
      setResults(response.data);
    });
  };

  const codeRunAllHandler = () => {
    runCode(testCases);
  };

  const codeRunSelectedHandler = () => {
    let selectedTestCases = [];

    selectedTestCases = testCases.filter((testCase) => testCase.checked);

    runCode(selectedTestCases);
  };

  const addTestCase = (testCase) => {
    const oldTestCases = [...testCases];
    const length = testCases.length;
    const testCaseNo = length ? oldTestCases[length - 1].testCaseNo + 1 : 0;

    oldTestCases.push({ ...testCase, checked: false, testCaseNo });
    setTestCases(oldTestCases);
    setRightPaneState('test-cases');
  };

  return (
    <div className="App">
      <SplitPane
        left={
          <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            supportedLanguages={supportedLanguages}
            runSelected={codeRunSelectedHandler}
            runAll={codeRunAllHandler}
          />
        }
        right={
          <RightPane
            rightPaneState={rightPaneState}
            setRightPaneState={setRightPaneState}
            results={results}
            testCases={testCases}
            setTestCases={setTestCases}
            addTestCase={addTestCase}
          />
        }
      />
    </div>
  );
}

export default App;
