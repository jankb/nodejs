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
  if (req.params.type == "xml")
  {
    resp.status(406);
    resp.send("Type not supported.\n");
    return;
  }
  else
  {
    pool.query('select * from produksjonsplass where produksjonsplassid = $1',[id], (error, result) => {
     if (error)
     {
       resp.status(500);
       resp.send(error);
       console.log(error);
     }
     else
     {
       resp.status(200);
       resp.type('json');
       data = result.rows;
       const endpoint = req.protocol+"://" +req.hostname + ":"+port+"/id/";
       navigation = {};
       navigation["next"] = endpoint + (id + 1);
       navigation["prev"] = endpoint + (id - 1);
       data.push(navigation);
       resp.json(result.rows);
     }
     })
  }
}

app.get("/", (req, res) => {
  const endpoint = req.protocol+"://" +req.hostname + ":"+port+"/id/<number>/<json*>\n";
  res.status(200).send('Usage:\n'+endpoint);
});


app.get("/id/:id/:type?", getId);

app.listen(port, () => { 
  console.log('Server started at localhost: ' + port);
});

