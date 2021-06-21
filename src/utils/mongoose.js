const mongoose = require('mongoose');

const dbName = process.env.DBName;
const mongoDB_URL = process.env.MONGODB_URL;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(`${mongoDB_URL}/${dbName}`, options).catch((error) => {
  console.log(error);
});

mongoose.connection
  .once('open', () => {
    console.log('Successfully connected to the database.');
  })
  .on('error', (error) => {
    console.log(error);
  });
