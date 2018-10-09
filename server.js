const express = require("express");
const Path = require("path");
const app = express();
const publicPath = Path.join(__dirname,"..","public")
const port = process.env.PORT || 8000;
const SvgMaker= require("./SVGmaker")
const PNGMaker = require("./ToPNG")
const puppeteer = require('puppeteer');



app.use(express.static(publicPath));


app.get("*", (req,res) => {
    if(req.query.length < 7){
        console.log(req.query)
    }

    const data = req.query;
var valuesGiven= []
for (x in data){
    valuesGiven.push(Number(data[x]))
}   
    (async() => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })})

    SvgMaker(valuesGiven)
    PNGMaker().then(()=>{

    res.set("Content-Type",'image/jpeg')
    res.sendFile(Path.join(__dirname,"/chart.jpeg"))
    console.log("done")
    })


});

app.listen(port , ()=>{
    console.log("Server live")
});