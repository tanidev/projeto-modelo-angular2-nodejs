// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const load = require('express-load');
const mongoose = require('mongoose');
const config = require('./config/config')

// Get our API routes
// const api = require('./server/routes/api');

const app = express();
console.log(config.mongo.urlConnection);
mongoose.connect(config.mongo.urlConnection(
  config.mongo.user, config.mongo.password, config.mongo.host, config.mongo.port, config.mongo.db
));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));

// Set our api routes
// app.use('/api', api);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

//load controllers and routes
load('controllers', {cwd: 'server'}).then('routers').into(app);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log('App: [' + config.app.name + '] running on port: [' + config.app.port + ']'));
