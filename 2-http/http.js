import fs from 'fs';
import http from 'http';
import url from 'url';

const petsPath = '../pets.json';

var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res){

    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    //const pathIndex = url.parsedUrl.split('/');
    //console.log(pathIndex);

    if (req.method === 'GET' && req.url === '/pets') {
        fs.readFile(petsPath, 'utf8', function(err, data){
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Error');
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
        })
    }
    else if (req.method === 'GET' && req.url === '/pets/0') {
        fs.readFile(petsPath, 'utf8', function(err, data){
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Error');
            }

            let pets = JSON.parse(data);
            let firstPet = JSON.stringify(pets[0]);

            res.setHeader('Content-Type', 'application/json');
            res.end(firstPet);
        })
    }
    else if (req.method === 'GET' && req.url === '/pets/1') {
        fs.readFile(petsPath, 'utf8', function(err, data){
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Error');
            }

            let pets = JSON.parse(data);
            let secondPet = JSON.stringify(pets[1]);

            res.setHeader('Content-Type', 'application/json');
            res.end(secondPet);
        })
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
    }
});

server.listen(port, function() {
    console.log('Listening on port', port);
});