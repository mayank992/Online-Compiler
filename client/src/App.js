import React, { useState } from 'react';
import axios from 'axios';
import SplitPane from './components/SplitPane/SplitPane';
import RightPane from './components/RightPane/RightPane';
import CodeEditor from './components/CodeEditor/CodeEditor';
import './App.css';

// temporary imports
import testCasesData from './components/RightPane/TestCases/testsData';

const supportedLanguages = ['C', 'C++'];
const languageAPIMapping = {
  C: 'c',
  'C++': 'cpp',
};

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('C++');
  const [testCases, setTestCases] = useState(testCasesData);
  const [resultsState, setResultsState] = useState('not-selected');
  // loading, not-selected, selected
  const [results, setResults] = useState([]);

  const codeRunHandler = () => {
    const options = {
      url: 'https://one-compiler.herokuapp.com/run',
      // url: 'http://localhost:4000/run',
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

    setResultsState('loading');

    axios(options).then((response) => {
      setResultsState('selected');
      const testCasesResult = response.data.testCasesData.map((testCase) => {
        return { ...testCase.testCaseInfo, verdict: testCase.verdict };
      });

      setResults(testCasesResult);
    });
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
            run={codeRunHandler}
          />
        }
        right={
          <RightPane
            resultsState={resultsState}
            results={results}
            testCases={testCases}
          />
        }
      />
    </div>
  );
}

export default App;
