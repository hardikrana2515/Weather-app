const mongoose = require('mongoose');
const weatherSchema= new mongoose.Schema({
    Temprature:String,
    Clouds:String,
    Wind:String,
    location:String,
    Date:String

},{collection:'Weather_Data'});

module.exports = mongoose.model('Weather_Data',weatherSchema);