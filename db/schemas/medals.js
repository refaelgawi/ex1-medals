const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;


var MedalsSchema = new Schema({
    CantreName:   {type:String, required: true},
    Medals:{
      gold: {type:String, required:true},
      silver:  {type:Number, required:true},
      bronza: {type:String, required: true}
    }
  },{collection: 'Medals'});


module.exports = mongoose.model('Medals',MedalsSchema);
