var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userdb',{useNewUrlParser:true,useUnifiedTopology: true});

module.exports = {mongoose};