const http =  require('http');
const fs   =  require('fs');
const path =  require('path');
const config = require('./config/server');
const server = http.createServer(handler);
const io = require('socket.io')(server);
const open = require('opn');
const apiRegex = /^\/api/i;

function handler(req, res){
    if (req.url.match(apiRegex)) {
        res.writeHead(500);
        res.end('No API implemented.');
    }else{
        if (req.method === "GET") {
            getFile(req, res);
        }
    }
    console.log(`path: ${req.url}, method: ${req.method}`);
};

const getFile = (req, res) => {
    let file = (req.url === "/") ? "/index.html" : req.url;
    let resolvedPath = path.join(__dirname, file);
    if (fs.existsSync(resolvedPath)) {
        res.writeHead(200);
        res.end(fs.readFileSync(resolvedPath, 'utf-8'));
    }else{
        res.writeHead(404);
        res.end('File not found.');
    }
}

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log(data);
        socket.emit('news', { hello: 'world' });
    });
});

server.listen(config.port);
console.log(`Server listening on port ${config.port}`);
//open(`http://localhost:${8080}`);
