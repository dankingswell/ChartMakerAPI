const { convertFile}  = require('convert-svg-to-jpeg');

async function PNGMaker(){
  const inputFilePath = './chart.svg';
  const outputFilePath = await convertFile(inputFilePath,{width:"1000px"});

  //console.log(outputFilePath);
  //=> "/path/to/my-image.jpeg"
};


module.exports = PNGMaker
