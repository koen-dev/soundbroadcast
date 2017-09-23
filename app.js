const http =  require('http');
const fs   =  require('fs');
const path =  require('path');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('okay');
});

server.listen(8080);
