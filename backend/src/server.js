const app = require('./app');
const http = require('http');
const server = http.createServer(app);
require('dotenv').config();

const PORT = process.env.PORT || 2000;

async function startServer() {
    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}...`)
    })
}

startServer();