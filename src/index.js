require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

// const formData = require("express-form-data");

const routes = require('./routes');
const { swagger } = require('./configs');
const { security } = require("./middlewares");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.set('trust proxy', 1);

// app.use(formData.parse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views/emails'));
app.use(cors());

app.use('/sparks-api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

app.use(security);

app.use('', routes);
app.use((err, req, res, next) => {
  res.status(500).send({ status: false, message: 'Internal server error' });
});

server.listen(port, () => {
  console.log(
    `SPARKS EMAIL SERVICE is running on http://localhost:${port}`
  );
});

module.exports = app;
