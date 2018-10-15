function SVGMaker(arrayOfValues){

  // takes values and forces them to a multiple of 5
  for(var i = 0 ;  i < arrayOfValues.length; i ++){

    // incase of incorrect values force max value
    if (arrayOfValues[i] > 5){
      arrayOfValues[i] = (5*2)/10;
    }
    else arrayOfValues[i] = (arrayOfValues[i]*2)/10;
  }

// gather required modules
const radar = require('svg-radar-chart')
const stringify = require('virtual-dom-stringify')
const smoothing = require('svg-radar-chart/smoothing')
var fs = require('fs');

const chart = radar({
	// columns
	Field1:`Field 1`,
  Field2: 'Field',
  Field3:"Field",
  Field4:"Field",
  Field5:"Field",
  Field6: 'Field',
  Field7: 'Field'
}, [
  // data
  {class: 'ideal', Field1:1, Field2: 1, Field3:  1,  Field4:1,Field5: 1, Field6:1, Field7:1},
  {class: 'current',Field1:arrayOfValues[0], Field2: arrayOfValues[1], Field3:arrayOfValues[2], Field4: arrayOfValues[3],Field5:arrayOfValues[4], Field6:arrayOfValues[5], Field7:arrayOfValues[6]}
],{
shapeProps: (data) => ({className: 'shape ' + data.class}),
smoothing:smoothing(.6)}
)


// stylign graph, view box == final dimensions
const svg = `
<svg version="1" xmlns="http://www.w3.org/2000/svg" width="1000" viewBox="-50 -10 200 130">
	<style>
  .axis {
    stroke: #555;
    stroke-width: .2;
  }
  .scale {
    fill: #f0f0f0;
    stroke: #999;
    stroke-width: .2;
  }
  .shape {
    fill-opacity: .5;
    stroke-width: .5;
  }
	.shape:hover {
			fill-opacity: .6;
    }
    .shape.ideal{
      fill:#00a0b0;
      stroke:#00a0b0;
    }
  .shape.current{
    fill:#cc333f;
  }
	</style>
	${stringify(chart)}
</svg>
`
// create SVG
fs.writeFile("chart.svg",svg,(err)=>{
})

}
module.exports= SVGMaker