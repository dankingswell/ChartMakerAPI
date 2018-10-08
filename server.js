const express = require("express");
const Path = require("path");
const app = express();
const publicPath = Path.join(__dirname,"..","public")
const port = process.env.PORT || 3000;
const SvgMaker= require("./SVGmaker")
const PNGMaker = require("./ToPNG")



app.use(express.static(publicPath));


app.get("*", (req,res) => {
    const data = req.query;
var valuesGiven= []
for (x in data){
    valuesGiven.push(data[x])
}
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

