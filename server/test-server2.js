const express = require('express');
const app = express();
app.use('/api', require('./src/routes/algorithms'));
app.listen(5557, () => console.log('started 5557'));
