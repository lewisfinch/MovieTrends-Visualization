import define1 from "./e63c207b5f5c4f9f@679.js";
import define2 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Graphical Encoding - Exercise

In this exercise, we have a dataset that contains the unemployment rate for each state for December 2019. Your task is to visualize this data in 6 different ways using D3. This exercise is about exploring possibilities, so it's okay if some of your visualizations aren't the most effective, as long as they are still appropriate. For example, the speedometer charts are not the most effective way, but they still work. A line chart, however, would not be appropriate and would not work for this type of data. Also, make sure to explore the largest possible set of marks and channels. Your solutions should include **at least 3 different channels and 3 different marks**.

To get started, create a fork of this notebook. When you are finished, **do not** publically publish your notebook. If you are using the "Classic" notebook interface, then go to the menu at the top with the three dots and click "Enable link sharing." If you are using the newer notebook interface, then click "Publish" and set the visibility to unlisted. You can then submit the link on Brightspace.`
)}

function _2(md){return(
md`## Data

The map data comes from [here](https://eric.clst.org/tech/usgeojson/) and is based on boundaries given by the U.S. Census Bureau.`
)}

function _usaGeo(FileAttachment){return(
FileAttachment('gz_2010_us_040_00_20m.json').json()
)}

function _4(md){return(
md`The unemployment data comes from the [U.S. Bureau of Labor Statistics](https://www.bls.gov/web/laus/laumstrk.htm). We'll put the unemployment data in two formats:
- An array of objects where each object has the name and unemployment rate of the state.
- A single object where the keys are the state names and the values are the unemployment rates.`
)}

async function _unemployment(d3,FileAttachment){return(
d3.csvParse(await FileAttachment('unemployment-dec-2019@2.csv').text(),
                           d3.autoType)
)}

function _stateToRate(unemployment){return(
Object.fromEntries(new Map(unemployment.map(d => [d.state, d.rate])))
)}

function _7(md){return(
md`We'll calculate the min and max unemployment rates:`
)}

function _extent(d3,unemployment){return(
d3.extent(unemployment, d => d.rate)
)}

function _9(md){return(
md`Next, we'll create a continuous color scale. Feel free to modify this or use other color scales too.`
)}

function _color(d3,extent){return(
d3.scaleSequential()
      .domain(extent)
      .interpolator(d3.interpolateBlues)
)}

function _11(md){return(
md`Lastly, you may find it handy to have a mapping from state name to abbreviation. This data is from [World Population Review](https://worldpopulationreview.com/states/state-abbreviations/).`
)}

function _stateToAbbr(){return(
{
  "Alabama": "AL",
  "Alaska": "AK",
  "American Samoa": "AS",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "District of Columbia": "DC",
  "Federated States Of Micronesia": "FM",
  "Florida": "FL",
  "Georgia": "GA",
  "Guam": "GU",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Marshall Islands": "MH",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Northern Mariana Islands": "MP",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Palau": "PW",
  "Pennsylvania": "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virgin Islands": "VI",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY"
}
)}

function _13(md){return(
md`## Example 1: Grid Cartogram`
)}

function _14(legend,color){return(
legend({
  color: color,
  title: 'Unemployment Rate, Decemeber 2019'
})
)}

function _15(gridCartogram){return(
gridCartogram
)}

function _16(md){return(
md`## Example 2: Speedometer Charts

This visualization encodes the unemployment rate using the angle of a line. See the [Small Multiples](/@nyuvis/small-multiples?collection=@nyuvis/info-vis-course) notebook for an explanation of how this code works.

We'll augment the data to make it easier to place into a grid.`
)}

function _numCols(){return(
8
)}

function _numRows(){return(
7
)}

function _gridPositions(d3,numRows,numCols){return(
d3.cross(d3.range(numRows), d3.range(numCols), (row, col) => ({row, col}))
)}

function _unemploymentWithGrid(d3,unemployment,gridPositions){return(
d3.zip(unemployment, gridPositions)
    .map(([data, position]) => ({...data, ...position}))
)}

function _speedometer(d3,numCols,numRows,extent,unemploymentWithGrid,lightgray)
{
  const margin = {top: 30, right: 20, bottom: 0, left: 30};
  const visWidth = 750 - margin.left - margin.right;
  const visHeight = 450 - margin.top - margin.bottom;

  const svg = d3.create('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle');

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // title
  g.append('text')
      .attr('font-size', '16px')
      .attr('dominant-baseline', 'hanging')
      .attr('x', visWidth / 2)
      .attr('y', -margin.top + 5)
      .text('Unemployment Rate, Dec. 2019');

  // set up scales
  
  const column = d3.scaleBand()
      .domain(d3.range(numCols))
      .range([0, visWidth])
      .paddingInner(0.05);
  
  const row = d3.scaleBand()
      .domain(d3.range(numRows))
      .range([0, visHeight])
      .paddingInner(0.05);
  
  const angle = d3.scaleLinear()
      .domain([0, Math.ceil(extent[1])])
      .range([0, Math.PI]);
  
  const radius = Math.min(column.bandwidth(), row.bandwidth()) / 2;
  
  // create a group for each cell in the grid
  const cell = g.selectAll('g')
    .data(unemploymentWithGrid)
    .join('g')
      .attr('transform', d => `translate(${column(d.col) + radius},${row(d.row) + radius})`);
  
  // use an arc generator to create a half-circle
  
  const arc = d3.arc()
      .innerRadius(radius - 1)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);
  
  cell.append('path')
      .attr('d', arc())
      .attr('fill', lightgray);
  
  // add baseline
  const line = d3.line();
  
  cell.append('path')
      .attr('d', d => line([[-radius, 0], [radius, 0]]))
      .attr('fill', 'none')
      .attr('stroke', lightgray)
      .attr('stroke-width', 1)
  
  // add sloped line
  cell.append('path')
      .attr('d', d => {
        const start = [0, 0];
        const end = [-Math.cos(angle(d.rate)) * radius,
                     -Math.sin(angle(d.rate)) * radius];
        return line([start, end])
      })
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 2);
  
  // add labels
  
  cell.append('text')
      .attr('y', 20)
      .attr('font-size', '10px')
      .text(d => d.state);
  
  cell.append('text')
      .attr('font-size', '12px')
      .attr('fill', lightgray)
      .attr('x', -radius)
      .attr('y', 10)
      .text('0');
  
  cell.append('text')
      .attr('font-size', '12px')
      .attr('fill', lightgray)
      .attr('x', radius)
      .attr('y', 10)
      .text(Math.ceil(extent[1]));

  return svg.node();
}


function _22(md){return(
md`## Solution 1:`
)}

function _23(md){return(
md`## Solution 2:`
)}

function _24(md){return(
md`## Solution 3:`
)}

function _25(md){return(
md`## Solution 4:`
)}

function _26(md){return(
md`## Solution 5:`
)}

function _27(md){return(
md`## Solution 6:`
)}

function _28(md){return(
md`---
## Appendix`
)}

function _lightgray(){return(
'#dcdcdc'
)}

function _d3(require){return(
require('d3@7')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["unemployment-dec-2019@2.csv", {url: new URL("./files/6ff47364694fc89e81852ef1f47e221ae3b0dc3b06edf3248613be7840459f835ce51379b282d7a1e5460d03f88565e5883f64691061d81835a633a0edbd4a07.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["gz_2010_us_040_00_20m.json", {url: new URL("./files/5bffca711a2b45090494c77bab30bfa36859ecb5a0619c7d93e1da8f8089be61df96021c578b53cfbd2c3f6611e2567183fec5ed9a66876b50bb47123b2c56b9.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("usaGeo")).define("usaGeo", ["FileAttachment"], _usaGeo);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("unemployment")).define("unemployment", ["d3","FileAttachment"], _unemployment);
  main.variable(observer("stateToRate")).define("stateToRate", ["unemployment"], _stateToRate);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("extent")).define("extent", ["d3","unemployment"], _extent);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("color")).define("color", ["d3","extent"], _color);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("stateToAbbr")).define("stateToAbbr", _stateToAbbr);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["legend","color"], _14);
  main.variable(observer()).define(["gridCartogram"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("numCols")).define("numCols", _numCols);
  main.variable(observer("numRows")).define("numRows", _numRows);
  main.variable(observer("gridPositions")).define("gridPositions", ["d3","numRows","numCols"], _gridPositions);
  main.variable(observer("unemploymentWithGrid")).define("unemploymentWithGrid", ["d3","unemployment","gridPositions"], _unemploymentWithGrid);
  main.variable(observer("speedometer")).define("speedometer", ["d3","numCols","numRows","extent","unemploymentWithGrid","lightgray"], _speedometer);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("lightgray")).define("lightgray", _lightgray);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("gridCartogram", child1);
  const child2 = runtime.module(define2);
  main.import("legend", child2);
  return main;
}
