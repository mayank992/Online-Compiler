require('./utils/mongoose');
const path = require('path');
const express = require('express');
const submissions = require('./submissions.route.js');

const app = express();
const port = process.env.PORT;
const publicDirPath = path.join(__dirname, '../client/build');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use('/run', submissions);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}...`);
});
