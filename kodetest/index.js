const express = require("express");
const app = express();
const port = 8080;


const Pool = require('pg').Pool;
const pool = new Pool({
 user: 'testuser',
 host: 'localhost',
 database: 'produksjonsplass',
 password: 'docker',
 port: 5432
})


const getId = (req, resp) =>
{
const id = parseInt(req.params.id);
pool.query('select * from produksjonsplass where produksjonsplassid = $1',[id], (error, result) => {
  if (error)
  {
    console.log(error);
  }
  else
  {
    console.log(result.rows);
    resp.status(200);
    resp.type('json');
    resp.json(result.rows);
  }
  })
}

app.get("/", (req, res) => {
    return res.status(200).send('Usage:\n1. Something.\n2. Other thing.\n');
});


app.get("/id/:id", getId);

app.listen(port, () => { 
console.log('Server started at localhost: ' + port);
});

