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

app.listen(3000, () => console.log('Example app listening on port 3000!'));
