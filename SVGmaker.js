function SVGMaker(arrayOfValues){
  for(var i = 0 ;  i < arrayOfValues.length; i ++){
    arrayOfValues[i] = (arrayOfValues[i]*2)/10
  }

  console.log(arrayOfValues);
const radar = require('svg-radar-chart')
const stringify = require('virtual-dom-stringify')
const smoothing = require('svg-radar-chart/smoothing')
var fs = require('fs');

const chart = radar({
	// columns
	Policies:`Privacy/Data Protection Notices & Policies`,
  Protection: 'Staff Data Protection',
  Risk_Assessment:"Risk Assessment",
  Data_Protection_Officer:"Data Protection Officer",
  Security:"Security",
  Governance: 'Governance',
  Compliance: 'Compliance'
}, [
  // data
  {class: 'ideal', Governance:1, Compliance: 1, Protection:  1,  Risk_Assessment:1,Policies: 1, Security:1, Data_Protection_Officer:1},
  {class: 'current',Governance:arrayOfValues[0], Compliance: arrayOfValues[1], Protection:  arrayOfValues[2], Policies: arrayOfValues[3],Risk_Assessment:arrayOfValues[4], Security:arrayOfValues[5], Data_Protection_Officer:arrayOfValues[6]},
  


],{
shapeProps: (data) => ({className: 'shape ' + data.class}),
smoothing:smoothing(.6)}
)



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
//var x  = process.stdout.write(svg)
fs.writeFile("chart.svg",svg, (err)=>{
  console.log("FS Error")
})

}
module.exports= SVGMaker