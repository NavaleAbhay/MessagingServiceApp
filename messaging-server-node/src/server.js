const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const { port } = require('./config');
const authRoutes = require('./routes/auth.routes');
const socketHandler = require('./socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);

socketHandler(io);

server.listen(port, () => console.log(`Node backend on http://localhost:${port}`)); 