var mongoose = require('mongoose');
module.exports = function() {
  var playerSchema = mongoose.Schema({
    username:{type:String,required:true,unique:true},
    score:Number
  });

  playerSchema.path('username').validate(function(val) {
    return val.length > 0 && val.length < 20;
  },'chars must be between 1 and 20');

  playerSchema.path('username').validate(function(val) {
    return \S.test(val);
  }, 'username must contain at least one non-whitespace charecter');



  mongoose.model('Player',playerSchema);
};
