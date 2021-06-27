const os = require('os');
const fs = require('fs');
const path = require('path');

const TaskQueue = require('../taskQueue/queue');
// const pyExec = require('./executers/python');
// const jsExec = require('./executers/javascript');
const { compileCCpp, runCCpp } = require('./executers/c-cpp');

const tmpDirPrefix = 'tmpexec-';
const taskQueueOptions = { limit: 5 };
const taskQueue = new TaskQueue(taskQueueOptions);

const extensions = {
  c: 'c',
  cpp: 'cpp',
  java: 'java',
  python: 'py',
  javascript: 'js',
};

/*
  TaskData: {
    code,
    language,
    testCases,
  }

  return 
  {
    stderr,
    exitCode,
    verdict,
    testsCasesData,
    testCasesCount
  }
*/

// get and execute the next task
taskQueue.on('next', async () => {
  const task = taskQueue.getTask();

  if (task === 'limit reached' || task === 'underflow') {
    return;
  }

  taskQueue.incrementTasksRunning();

  const { resolve, reject, taskData } = task;
  const extension = extensions[taskData.language];

  /* 
    creating seperate unique temporary directories for every solution
    in the operating system /tmp folder and delete that directory 
    after the completion of the exection
  */
  const tmpDirPath = await fs.promises.mkdtemp(
    path.join(os.tmpdir(), tmpDirPrefix)
  );
  const solutionW = fs.createWriteStream(
    path.join(tmpDirPath, `solution.${extension}`)
  );

  const cleanup = () => {
    taskQueue.decrementTasksRunning();
    fs.promises.rmdir(tmpDirPath, { recursive: true });
  };

  solutionW.write(taskData.code, async () => {
    if (taskData.language === 'c' || taskData.language === 'cpp') {
      try {
        // compilation result
        const compRes = await compileCCpp(tmpDirPath, `solution.${extension}`);
        let passed = 0;
        let testCasesData = [];

        if (compRes.verdict === 'CE') {
          // compilation error occured
          resolve({
            ...compRes,
            testCasesCount: {
              passed: 0,
              total: taskData.testCases.length,
            },
          });
        } else {
          for (let itr = 0; itr < taskData.testCases.length; itr++) {
            const { input, output } = taskData.testCases[itr];
            const execRes = await runCCpp(tmpDirPath, input, output);

            if (execRes.verdict !== 'RE' && execRes.verdict !== 'WA') {
              passed++;
            }

            testCasesData.push(execRes);
          }
        }

        // cleanup();
        resolve({
          verdict: 'Successfully Executed',
          exitCode: 0,
          testCasesData,
          testCasesCount: {
            passed: passed,
            total: taskData.testCases.length,
          },
        });
      } catch (error) {
        cleanup();
        reject(error);
      }
    }
  });
});

function runProgram(taskData) {
  const taskPromise = taskQueue.addTask(taskData);

  // promise => {resolve, reject, taskData}
  return taskPromise;
}

module.exports = runProgram;
