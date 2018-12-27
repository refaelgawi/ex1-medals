const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;


const CountrySchema = new Schema({
    country:  {type:String, required: true},
    medals:{
      gold:   {type:Number, required:true},
      silver: {type:Number, required:true},
      bronza: {type:Number, required: true}
    }
  },{collection: 'countries'});


module.exports = mongoose.model('Country',CountrySchema);
