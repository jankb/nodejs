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

function getData(id) {
  const data = db.prepare('select * from produksjonsplass where produksjonsplassid = ?').all(id);
  return data;
}

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

//app.get("/id/:id", (req, res) => {
//  if (req.accepts('json')) {
//    res.status(200);
//    res.type('json');
//    let data = getData(req.params.id);
//    let id_next = parseInt(req.params.id) + 1; 
//    let id_prev = parseInt(req.params.id) + 2; 
//    data.push("next:8080/id/"+id_next);
//    data.push("prev:8080/id/"+id_prev);
//    res.json(data);
//  } else
//  {
//    res.status(406);
//    res.send('No support for ' + req.headers['accept'] + '\n');
//  }
//});

app.listen(port, () => { 
console.log('Server started at localhost: ' + port);
});

