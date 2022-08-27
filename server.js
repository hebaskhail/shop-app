const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { routesNotFound, globalErrorHandler } = require('./middleware/globalException');
require('dotenv').config();
require('./db/config');

const app = express();
const PORT = process.env.PORT || 5000;

const appRoutes = require('./routes');

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use('/api', appRoutes);

app.use(routesNotFound);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log('Server running at port ', PORT);
});
