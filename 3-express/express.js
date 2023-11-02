import express from 'express'
import fs from 'fs'

const PORT = process.env.PORT || 8000
const petsPath = '../pets.json';

const app = express();

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

app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}`);
})