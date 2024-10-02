const express = require('express');
const axios = require('axios');
             require('./database');
const weatherdata = require('./weatherdata');   
const path = require('path');   


const dirpath = path.join(__dirname,'frontpage');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(`${dirpath}/front.html`);
    

});

app.get('/weather', async (req, res) => {
    
    const city = req.query.city;
    const apikey = '445a1a09b652a34e91fa900dbb6e1093';
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`;
    let weather;
    let err = null;
    try{
        const response = await axios.get(url);
        weather=response.data;
    }
    catch(err){
        weather=null;
        err = 'Error getting weather,please try again...';
    }
    res.render('index', {err,weather});
});

app.post('/weather',async(req,res)=>{
    let data= new weatherdata(req.body);
    let result = await data.save();
    console.log(result);
    console.log(data);
});

const PORT= 3000;
app.listen(PORT, (req, res) => {
    console.log (`listening on port ${PORT}`);
});