import fs from 'fs'; //ES6 standard
import { exit } from 'node:process';
//const fs = require('fs'); //common JavaScript
//import { petsPath } from '../pets.json';
const petsPath = '../pets.json';

const args = process.argv;
console.log(args);

if(args.length < 3){
    sendError()
}

function sendError() {
    console.log("Usage: [create | read | update | destroy]")
    exit(1);

}

function readAction(action) {
    if (action === "read") {
        readPets(args[3]);    
    }
    else if (action === "create"){
        //...
    }
}

function readPets(index){
    fs.readFile(petsPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const pets = JSON.parse(data);
        
        if (index !== undefined && typeof parseInt(index) === "number") {
            console.log(index)
            if (index < 0 || index >= pets.length) {
                console.error('Usage: node fs.js read INDEX')
                process.exit(1);
            }
            console.log(pets[index]);
            exit(0);
        }
        else {
            console.log(pets);
            exit(0);
        }
    });
}
readAction(args[2]);

