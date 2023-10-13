import express = require('express');
import http = require('http');
import path = require('path');
import morgan = require('morgan');

const app = express();

const port: string | number = process.env['PORT'] || 3000;

app.use(express.static(path.join(__dirname, '/../dist/multiplayer')));
app.use(morgan('dev')); // 'dev' is one of the predefined formats provided by Morgan

app.use(express.json());

// Connect to server
const server: http.Server = http.createServer(app);
server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
