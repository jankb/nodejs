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

function getPrevNext(id)
{
  return new Promise((resolve, reject) => {
    pool.query('select next, prev from (select produksjonsplassid, lag(produksjonsplassid,1,-1) over (order by produksjonsplassid) as prev, lead(produksjonsplassid,1,-1) over (order by produksjonsplassid) as next from produksjonsplass) as innerquery where produksjonsplassid = $1',[id], (error, result) => {
    {
     resolve( result.rows);
    }
  });
 });
}

const getId = async (req, resp) =>
{
  console.log(Date() + " Request from : " + req.ip + " for " + req.originalUrl);
  const id = parseInt(req.params.id);
  if (req.params.type == "xml")
  {
    resp.status(406);
    resp.send("Type not supported.\n");
    return;
  }
  else
  {
    const prevnext = await getPrevNext(id);
    pool.query('select * from produksjonsplass where produksjonsplassid = $1',[id], (error, result) => {
     if (error)
     {
       resp.status(500);
       resp.send(error);
       console.log(error);
     }
     else
     {
       data = result.rows;
       if (data.length == 0)
       {
         resp.status(404);
         resp.send("No data found for id " + id);
       }
       else
       {
         resp.status(200);
         resp.type('json');
         const endpoint = req.protocol+"://" +req.hostname + ":"+port+"/id/";
         navigation = {};
         if (prevnext[0].next != -1) {navigation["next"] = endpoint + prevnext[0].next};
         if (prevnext[0].prev != -1) {navigation["prev"] = endpoint + prevnext[0].prev};
         data.push(navigation);
         resp.json(result.rows);
       }
     }
     })
  }
}

app.get("/", (req, res) => {
  console.log(Date() + " Request from : " + req.ip + " for " + req.originalUrl);
  const endpoint = req.protocol+"://" +req.hostname + ":"+port+"/id/<number>/<json*>\n";
  res.status(200).send('Usage:\n'+endpoint);
});


app.get("/id/:id/:type?", getId);

app.listen(port, () => { 
  console.log(Date() + ' Server started at localhost: ' + port);
});

