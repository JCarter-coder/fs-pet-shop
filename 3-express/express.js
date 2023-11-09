import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';            

/* import morgan from 'morgan';


app.disable('x-powered-by');
app.use(morgan('short')); */

const PORT = process.env.PORT || 8000
const petsPath = '../pets.json';

const app = express();

/* app.use(function(req, res, next) {
    var bodyJSON = '';
    req.on('data', function(chunk) {
        bodyJSON += chunk.toString();
    });

    req.on('end', function() {
        var body;

        if (bodyJSON !== '') {
            body = JSON.parse(bodyJSON);
        }

        req.body = body;

        next();
    });
}); */

app.get('/pets', function(req, res){
    fs.readFile(petsPath, 'utf8', function(err, data){
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        var pets = JSON.parse(data);

        res.send(pets);
    })
})

/* app.post('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, data){
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        var pets = JSON.parse(data);
        var pet = req.body.name;

        if (!pet) {
            return res.sendStatus(400);
        }

        pets.push(pet);

        var newPetsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
            if (writeErr) {
                console.error(writeErr.stack);
                return res.sendStatus(500);
            }

            res.set('Content-Type', 'application/json');
            res.send(pet);
        });
    });
}); */

app.get('/pets/:id', function(req, res){
    fs.readFile(petsPath, 'utf8', function(err, data){
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        var id = Number.parseInt(req.params.id);
        var pets = JSON.parse(data);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        res.send(pets[id]);
    })
});

app.use(function(req, res) {
    res.sendStatus(404);
});

app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}`);
})