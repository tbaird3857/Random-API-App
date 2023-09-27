const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 8081;

var mongoDB = 'mongodb://127.0.0.1/apidb';

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB failed to connect'));
db.on('connected', console.log.bind(console, 'MongoDB connected'));

const apiSchema = new mongoose.Schema({
    API: String,
    Description: String,
    Link: String,
  });

const APIModel = mongoose.model('API', apiSchema);

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next();
});

app.use(express.json());
app.use('/api', require('./route/request'));

// Endpoint to save API to MongoDB
app.post('/api/save-api', async (req, res) => {
    const { API, Description, Link } = req.body;
  
    try {
      const api = new APIModel({ API, Description, Link });
      await api.save();
      res.status(201).json({ success: true, message: 'API saved successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
