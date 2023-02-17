const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

mongoose.connect(uri, {});

app.listen(process.env.PORT, () =>
  console.log(`MongoDB listening at port: ${port}`)
);

server.listen(3000, () => {
  console.log('Socket listening at port: 3000');
});

module.exports = app;