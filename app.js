const http =  require('http');
const fs   =  require('fs');
const path =  require('path');
const server = http.createServer(handler);
const io = require('socket.io')(server);
const open = require('opn');
const apiRegex = /^\/api/i;
const port = (process.env.NODE_ENV === "prod") ? 80 : 8080;



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

server.listen(port);
console.log(`Server listening on port ${port}`);
//open(`http://localhost:${8080}`);
