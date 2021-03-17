

const express = require("express");
const router = express.Router();
const axios = require('axios');
var browserify = require('browserify');
const { JSDOM } = require("jsdom");
const bodyParser = require("body-parser");




const app = express();

//Set view engine to ejs
app.set("view engine", "ejs"); 


//Tell Express where we keep our index.ejs
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



var getIP = 'http://ip-api.com/json/';
axios.get(getIP).then(response=>{
    const cityName = response.data.city;
    console.log(cityName);
    const unit = "metric";
    const apiKey = "0728c411e8de2c74f24c536066d40d1d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units="+unit+"&appid="+apiKey;
    axios.get(url).then(res=>{
        const temp = res.data.main.temp;
        const weatherDescription = res.data.weather[0].description;
        const icon = res.data.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@4x.png";

       //we render index.ejs
        app.get('/',(req,res)=>{  
            res.render("index",{city:cityName,temp:temp,desc:weatherDescription,img:imageUrl});
        });
        console.log(temp);
        console.log(weatherDescription);
        console.log(icon);

    }).catch(error=>{
        console.log(error);
    })
}).catch(error=>{
    console.log(error);
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});
//°C