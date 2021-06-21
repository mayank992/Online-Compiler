const express = require('express');
const { runCode, getSubmissionInfo } = require('./submissions.controller.js');

const router = new express.Router();

router.get('/:submissionID', getSubmissionInfo);

router.post('/', runCode);

module.exports = router;
