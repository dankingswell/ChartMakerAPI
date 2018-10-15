const express = require("express");
const Path = require("path");
const app = express();
const publicPath = Path.join(__dirname,"..","public")
const port = process.env.PORT || 8000;
const SvgMaker= require("./SVGmaker.1")
const JPEGMaker = require("./ToJPEG")
const puppeteer = require('puppeteer');



app.use(express.static(publicPath));


app.get("*", (req,res) => {

    // gather query string information
    const data = req.query;

    // force type of number and push to array for chart creation
    var valuesGiven =[]
    for (x in data){
    valuesGiven.push(Number(data[x]))
    }   

    // setup defualt state of puppeterr
    (async() => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })})

    // create the SVG
    try{
    SvgMaker(valuesGiven)
    }catch{
        console.log("currently an error with svg Library throws error on dynamic field inputs but still generates SVG")
    }

    // PNG creation promise awaits conirmation of creation sends PNG and issues done log.
    JPEGMaker().then(()=>{

    // create response of desired type
    res.set("Content-Type",'image/jpeg')
    // send the converted Jpeg
    res.sendFile(Path.join(__dirname,"/chart.jpeg"))
    console.log("done")
    })


});

app.listen(port , ()=>{
    console.log("Server live")
});