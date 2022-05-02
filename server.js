const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  return res.status(200).send('Usage:\n1. Something.\n2. Other thing.\n');
});

app.get("/id/:id", (req, res) => {
    console.log("Accepts : " + JSON.stringify(req.headers));
    if (req.accepts('json', 'html', 'xml')) {
      res.status(200);
      res.type('json');
      res.send('You requested id ' + req.params.id + '\n');
    } else
    {
      res.status(406);
      res.send('No support for ' + req.headers['accept'] + '\n');
    }
});

app.listen(port, () => { 
console.log('Server started at localhost: ' + port);
});

