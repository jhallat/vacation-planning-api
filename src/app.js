const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());

const thingsToPackRouter = require('./routes/thingsToPackRoute');
const conditionsRouter = require('./routes/conditionsRoute');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use((req, res, next) => {
    console.log('Testing middleware');
    next();
});

app.use('/api/v1/things-to-pack', thingsToPackRouter);
app.use('/api/v1/conditions', conditionsRouter);


module.exports = app;
