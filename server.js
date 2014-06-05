//****************************************************\\
//*****************Node.js Web服务器*****************\\
//******在命令行中运行 node server.js 启动服务器******\\
//****************************************************\\

var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');

http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    pathname && (pathname = pathname.slice(1));
    console.log(pathname);

    var ext = path.extname(pathname);
    ext = ext ? ext.slice(1) : 'unknown';

    fs.exists(pathname, function(exists) {
        if (!exists) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('Not Found');
            res.end();
        } else {
            fs.readFile(pathname, "binary", function(err, file) {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(err);
                } else {
                    res.writeHead(200, {
                        'Content-Type': req.headers['content-type'] || mine[ext] || 'text/plain'
                    });
                    res.write(file, 'binary');
                    res.end();
                }
            });
        }
    });
}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080');