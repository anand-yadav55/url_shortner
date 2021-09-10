const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = process.env.MONGODB_CONNECTION_STRING;

const connection = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use('/api/genurl', require('./routes/genUrl'));

app.listen(PORT, () => console.log('Server running'));
