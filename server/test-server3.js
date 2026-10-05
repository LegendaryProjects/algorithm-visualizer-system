const express = require('express');
const cors = require('cors');
// require('dotenv').config();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/algorithms', require('./src/routes/algorithms'));

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
console.log('end of file');
