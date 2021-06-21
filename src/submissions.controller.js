const Submission = require('./submission.model.js');
const runProgram = require('./utils/compile-run/compile-run');

module.exports.getSubmissionInfo = async function (req, res) {
  const submissionID = req.params.submissionID;

  try {
    const subInfo = await Submission.findOne({ _id: submissionID }).exec();

    if (!subInfo) {
      // Invalid submission ID
      res.status(404).send({
        error: 'submission not found',
      });
    }

    res.send(subInfo);
  } catch (error) {
    // error occured while querying the submission info from the database
    res.status(500).send({
      error: 'An error occured! Please try again later.',
    });
    console.log(error);
  }
};

/*
  TaskData: {
    code,
    language,
    testCases,
  }

  response: {
    submissionID,
    stderr,
    exitCode,
    verdict,
    testsCasesData,
    testCasesCount,
  }
*/
module.exports.runCode = async function (req, res) {
  try {
    const body = req.body;
    let { code, language, testCases } = body;
    language = language.toLowerCase();

    const submissionDoc = new Submission({
      code: code,
      language: language,
      testCasesCount: {
        total: testCases.length,
      },
    });

    const { _id: submissionID } = await submissionDoc.save();

    const result = await runProgram({
      code,
      language,
      testCases,
    });

    const response = await Submission.findOneAndUpdate(
      {
        _id: submissionID,
      },
      result,
      { new: true }
    );

    res.send(response);
  } catch (error) {
    res.status(500).end();
  }
};
