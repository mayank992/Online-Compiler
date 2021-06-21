const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { time, clear } = require('console');

function compileCCpp(tmpDirPath, fileName) {
  return new Promise((resolve, reject) => {
    const errorFilePath = path.join(tmpDirPath, 'error.txt');
    const errorW = fs.createWriteStream(errorFilePath);

    const compile = spawn('g++', ['-o', 'executable', fileName], {
      cwd: tmpDirPath,
    });

    compile.stderr.pipe(errorW);

    compile.on('error', (error) => {
      reject(error);
    });

    compile.on('close', (exitCode) => {
      const result = {
        exitCode,
        verdict: !exitCode ? '' : 'CE',
        stderr: fs.readFileSync(errorFilePath).toString(),
      };

      resolve(result);
    });
  });
}

function runCCpp(tmpDirPath, input = '', expectedOutput = '') {
  input = input.trim() + '\n';
  expectedOutput = expectedOutput.trim();

  return new Promise((resolve, reject) => {
    // const outputFilePath = path.join(tmpDirPath, 'output.txt');
    // const outputW = fs.createWriteStream(outputFilePath);

    const execute = spawn(`./executable`, [], {
      cwd: tmpDirPath,
    });

    execute.stdin.write(input);

    const timeout = setTimeout(() => {
      try {
        process.kill(execute.pid, 'SIGKILL');
      } catch (e) {
        console.log('Cannot kill process');
        reject({ error: 'Canot Kill Process' });
      }
    }, 10 * 1000);

    let output = '';
    execute.stdout.on('data', (chunk) => {
      output += chunk;
    });

    // emitted when all the data from the stream is consumed
    execute.stdout.on('end', () => {
      output = output.toString().trim();
    });

    execute.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });

    execute.on('close', async (exitCode, signal) => {
      clearTimeout(timeout);
      if (exitCode === null) {
        return resolve({
          exitCode,
          verdict: 'RE',
          stderr: signal,
          testCaseInfo: {
            input: input.trim(),
            output,
            expectedOutput,
          },
        });
      }

      if (output !== expectedOutput) {
        return resolve({
          exitCode,
          verdict: 'WA',
          testCaseInfo: {
            input: input.trim(),
            output,
            expectedOutput,
          },
        });
      }

      resolve({
        exitCode,
        verdict: 'AC',
        testCaseInfo: {
          input: input.trim(),
          output,
          expectedOutput,
        },
      });
    });
  });
}

module.exports = {
  compileCCpp,
  runCCpp,
};
