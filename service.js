const express       =     require("express");
const bodyParser    =     require('body-parser');
const app           =     express();
const {PORT, DB}    =     require('./consts');
const mlab_connect  =     require('./db/connection');
const Medals          =     require('./db/schemas/medals');

module.exports = () => {
  mlab_connect();

  app.use((req,res,next) => {
    bodyParser.json();                          // to support JSON-encoded bodies
    bodyParser.urlencoded({extended: true});    // to support URL-encoded bodies
    bodyParser.raw();
    next();
  })

  app.get('/',(req,res) => {
    res.send("this is index");
  })

  app.get('/getAllMedals', (req,res) => {
    Medals.find({UK}).then((medals) => {
      res.send(medals);
    }).catch((e) => {
      res.status(401).send(e);
    })
  })

  app.get('/top', (req,res) => {
    Medals.find({}).then((medals) => {
      res.send(medals);
    }).catch((e) => {
      res.status(401).send(e);
    })
  })

  app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
  })
}
