const mongoose = require('mongoose');

const testCaseInfoSchema = new mongoose.Schema(
  {
    exitCode: Number,
    verdict: String,
    stderr: String,
    testCaseInfo: {
      input: String,
      output: String,
      expectedOutput: String,
    },
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema({
  // _id: submission id,
  language: {
    type: String,
    enum: {
      values: ['c', 'cpp'],
      message: '{VALUE} language not supported',
    },
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  verdict: {
    type: String,
    enum: {
      values: [
        'AC',
        'WA',
        'TLE',
        'RE',
        'CE',
        'Running',
        'Successfully Executed',
      ],
      message: '{VALUE} not supported',
    },
    default: 'Running',
  },
  stderr: {
    type: String,
    default: '',
  },
  exitCode: Number,
  testCasesData: [testCaseInfoSchema],
  testCasesCount: {
    passed: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
});

submissionSchema.methods.toJSON = function () {
  const submission = this;

  // convert the document into the a plain javascript object
  const submissionObject = submission.toObject();

  submissionObject.submissionID = submissionObject._id;

  delete submissionObject.__v;
  delete submissionObject._id;

  return submissionObject;
};

const Submission = mongoose.model('submissions', submissionSchema);

module.exports = Submission;
