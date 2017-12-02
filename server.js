const express = require('express');
const app = express();
const dataset = require('./index.js').dataset;

const concat = require('concat-stream');
app.use(function(req, res, next){
    req.pipe(concat(function(data){
        req.body = data;
        next();
    }));
});

process.on('SIGINT', () => {
    console.log("Exiting");

    process.exit();
});

app.get(/.*/, (req, res) => {

    let value = dataset.get(req.path);
    if (typeof value === 'string') {
        res.send(value);
        return;
    }

    res.status(404).send('not found');
    return;
});
app.put(/.*/, (req, res) => {
    dataset.set(req.path, req.body.toString());
    res.status(204).send();
    return;
});

app.listen(80, () => {
    console.log('Keypad listening on port 80!');
    console.log('');
    console.log('  Usage (replace IP/PORT as required) ');
    console.log('');
    console.log('  curl --silent --fail -X PUT http://127.0.0.1:80/secret/key -d "new secret"');
    console.log('  curl --silent --fail -X GET http://127.0.0.1:80/secret/key');
});
