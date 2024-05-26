const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
    // Configura CORS
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Sirve archivos estáticos
    if (req.method === 'GET') {
        let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        let extname = path.extname(filePath);
        let contentType = 'text/html';

        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.error(err); // Log the error to the server console
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

const io = require('socket.io')(server); // Pasa la instancia del servidor a socket.io

server.listen(port, () => console.log(`Server running on port ${port}`));

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('message', (evt) => {
        console.log(evt);
        socket.broadcast.emit('message', evt);
    });
});

io.on('disconnect', (evt) => {
    console.log('some people left');
});