const express       =     require("express");
const bodyParser    =     require('body-parser');
const app           =     express();
const {PORT, DB}    =     require('./consts');
const mlab_connect  =     require('./db/connection');
const Country       =     require('./db/schemas/country');

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

  app.get('/getAllCountries', (req,res) => {
    Country.find().then((countries) => {
      res.send(countries);
    }).catch((e) => {
      res.status(401).send(e);
    })
  })

  app.post('/getCountry/:country', (req,res) => {
    const {country} = req.params; // const country = req.params.country;
    if(!country)
      return res.status(404).send();

    Country.find({country: country.toLowerCase()}).then((countries) => {
      res.send(countries);
    }).catch((e) => {
      res.status(401).send(e);
    })
  })

  app.post('/getCountryByMinMedals/:gold/:silver?/:bronza?', (req,res) => {
    let {gold,silver,bronza} = req.params;
    if(!silver) silver = 0;
    if(!bronza) bronza = 0;

    Country.find({
      'medals.gold':   {$gte: gold},
      'medals.silver': {$gte: silver},
      'medals.bronza': {$gte: bronza}
    }).then((countries) => {
      res.send(countries);
    }).catch((e) => {
      res.status(401).send(e);
    })
  })


  app.all('*', (req,res) => {
    res.status(404).send();
  })

  app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
  })
}
