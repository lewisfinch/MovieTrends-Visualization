import define1 from "./a33468b95d0b15b0@817.js";
import define2 from "./606721ba06ae51d6@563.js";
import define3 from "./80f920d5281ef8ba@1077.js";

async function _1(md,FileAttachment){return(
md`# Small Multiples Practice - Solutions

Below are two examples of grid cartograms from New York Times and CBS for the 2020 presedential election.

<figure>
  ${await FileAttachment("nyt-grid-cartogram.png").image()}
  <figcaption>[New York Times](https://www.nytimes.com/interactive/2020/11/03/us/elections/forecast-uncounted-votes-president.html?action=click&pgtype=Article&state=default&module=styln-elections-2020&region=TOP_BANNER&context=election_recirc)</figcaption>
</figure>

<figure>
  ${await FileAttachment("cbs-grid-cartogram.png").image()}
  <figcaption>[CBS](https://www.cbsnews.com/election/2020/president/)</figcaption>
</figure>

You can see more examples in this [notebook](/@severo/grid-cartograms) and in this [Washington Post article](https://www.washingtonpost.com/wp-srv/special/business/states-most-threatened-by-trade/).

## Basic Grid Cartogram

Let's see how we can make a grid cartogram for state unemployment data. We will represent each state with a square and color it according to its unemployment rate in December 2019.`
)}

function _2(md){return(
md`### Data

We have an array containing each states' unemployment rate. We also have an object that contains abbreviations for the state names.`
)}

function _3(unemployment){return(
unemployment
)}

function _4(stateToAbbr){return(
stateToAbbr
)}

function _5(md){return(
md`We can use a tool like [aRanger](http://code.minnpost.com/aranger/) to generate the data for the grid of states or we can get a premade arrangement from this [block by Jane Pong](https://bl.ocks.org/officeofjane/2c3ed88c4be050d92765de912d71b7c4). This gives us the coordinates of each state in the grid. Each sub-array gives the column, row, and abbreviation for the state.`
)}

function _stateGrid(){return(
[[0,0,"AK"],[10,0,"ME"],[5,1,"WI"],[9,1,"VT"],[10,1,"NH"],[0,2,"WA"],[1,2,"ID"],[2,2,"MT"],[3,2,"ND"],[4,2,"MN"],[5,2,"IL"],[6,2,"MI"],[7,2,"NY"],[9,2,"MA"],[0,3,"OR"],[1,3,"NV"],[2,3,"WY"],[3,3,"SD"],[4,3,"IA"],[5,3,"IN"],[6,3,"OH"],[7,3,"PA"],[8,3,"NJ"],[9,3,"CT"],[10,3,"RI"],[0,4,"CA"],[1,4,"UT"],[2,4,"CO"],[3,4,"NE"],[4,4,"MO"],[5,4,"KY"],[6,4,"WV"],[7,4,"VA"],[8,4,"MD"],[9,4,"DE"],[1,5,"AZ"],[2,5,"NM"],[3,5,"KS"],[4,5,"AR"],[5,5,"TN"],[6,5,"NC"],[7,5,"SC"],[8,5,"DC"],[3,6,"OK"],[4,6,"LA"],[5,6,"MS"],[6,6,"AL"],[7,6,"GA"],[0,7,"HI"],[3,7,"TX"],[8,7,"FL"]]
)}

function _7(md){return(
md`Next, will create an object that maps from a state's abbreviation to its row and column. For example, \`stateToPosition["ME"]\` should equal \`{ row: 0, col: 10 }\`.`
)}

function _stateToPosition(stateGrid){return(
Object.fromEntries(stateGrid.map(([col, row, state]) => [state, {row, col}]))
)}

function _9(stateToPosition){return(
stateToPosition["ME"]
)}

function _10(md){return(
md`We can use \`stateToPosition\` to set the row and column for each object in \`unemployment\`. Complete the below cell so that \`unemploymentWithPosition\` is an array of objects where each object contains the abbreviated state name, unemployment rate, row, and col. Here's what the object for North Dakota should look like.

\`\`\`
{
  state: "ND",
  rate: 2.4,
  row: 2,
  col: 3
}\`\`\``
)}

function _unemploymentWithPosition(unemployment,stateToAbbr,stateToPosition){return(
unemployment.map(d => {
  const abbr = stateToAbbr[d.state];
  const {row, col} = stateToPosition[abbr];
  
  return {
    state: abbr,
    rate: d.rate,
    row: row,
    col: col,
  }
})
)}

function _12(md){return(
md`### Scales

Next, we will create the scales. To start, we will get the number of rows and columns in the grid.`
)}

function _numberOfRows(d3,unemploymentWithPosition){return(
d3.max(unemploymentWithPosition, d => d.row) + 1
)}

function _numberOfCols(d3,unemploymentWithPosition){return(
d3.max(unemploymentWithPosition, d => d.col) + 1
)}

function _15(md){return(
md`Then we will set the size of a cell in the grid and calculate the size of the map by multiplying the cell size by the number of rows to get the height and by the number of columns to get the width.`
)}

function _cellSize(){return(
50
)}

function _mapWidth(numberOfCols,cellSize){return(
numberOfCols * cellSize
)}

function _mapHeight(numberOfRows,cellSize){return(
numberOfRows * cellSize
)}

function _19(md){return(
md`Now we can define the scales that we wil use to position the cells by their row and column index. Complete below definitions for the row and column band scales.`
)}

function _row(d3,numberOfRows,mapHeight){return(
d3.scaleBand()
    .domain(d3.range(numberOfRows))
    .range([0, mapHeight])
    .padding(0.05)
)}

function _col(d3,numberOfCols,mapWidth){return(
d3.scaleBand()
    .domain(d3.range(numberOfCols))
    .range([0, mapWidth])
    .padding(0.05)
)}

function _22(md){return(
md`We will also define a color scale. Get an array containing the minimum and maximum unemployment rates.`
)}

function _minMaxRate(d3,unemployment){return(
d3.extent(unemployment, d => d.rate)
)}

function _color(d3,minMaxRate){return(
d3.scaleSequential()
    .domain(minMaxRate)
    .interpolator(d3.interpolateBlues)
)}

function _25(legend,color){return(
legend({
  color: color,
  title: 'Unemployment Rate, Decemeber 2019'
})
)}

function _gridCartogram(d3,mapWidth,mapHeight,unemploymentWithPosition,col,row,color)
{
  // set up
  
  const svg = d3.create('svg')
      .attr('width', mapWidth)
      .attr('height', mapHeight);
  
  // Add a group (g) for each object in unemploymentWithPosition.
  // Translate the group into position according to its row and column.
  
  const cells = svg.selectAll('g')
    .data(unemploymentWithPosition)
    .join('g')
      .attr('transform', d => `translate(${col(d.col)}, ${row(d.row)})`);
  
  // Add one rectangle to each group
  // Set its color using the color scale
  
  cells.append('rect')
      .attr('width', col.bandwidth())
      .attr('height', row.bandwidth())
      .attr('fill', d => color(d.rate));
  
  // Add one text element to each group for the state label.
  // Position the label in the center of the square.
  // Set the font-size to 12 and the font-family to sans-serif
  
  cells.append('text')
      .attr('font-size', 12)
      .attr('font-family', 'sans-serif')
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .attr('fill', d => d3.hcl(color(d.rate)).l > 50 ? 'black' : 'white')
      .attr('x', col.bandwidth() / 2)
      .attr('y', row.bandwidth() / 2)
      .text(d => d.state);
  
  return svg.node();
}


function _27(md){return(
md`## Area Chart Grid Cartogram

In the [Small Multiples](/@nyuvis/small-multiples) notebook, I showed you how to make the following chart:`
)}

function _28(stateUnemploymentDecade){return(
stateUnemploymentDecade
)}

function _29(md){return(
md`Let's turn this into a grid cartogram. Instead of placing the states in order of their average unemployment, we will place them in their rough position in the country.`
)}

function _30(md){return(
md`### Data

We start with the same data as in the reading, where we have 10 years of unemployment data for each state.`
)}

function _31(unemploymentData){return(
unemploymentData
)}

function _32(md){return(
md`Since this dataset includes Puerto Rico, we will add it to our grid and once again create an object that maps from the state abbreviation to its position.`
)}

function _states(){return(
[[0,0,"AK"],[10,0,"ME"],[5,1,"WI"],[9,1,"VT"],[10,1,"NH"],[0,2,"WA"],[1,2,"ID"],[2,2,"MT"],[3,2,"ND"],[4,2,"MN"],[5,2,"IL"],[6,2,"MI"],[7,2,"NY"],[9,2,"MA"],[0,3,"OR"],[1,3,"NV"],[2,3,"WY"],[3,3,"SD"],[4,3,"IA"],[5,3,"IN"],[6,3,"OH"],[7,3,"PA"],[8,3,"NJ"],[9,3,"CT"],[10,3,"RI"],[0,4,"CA"],[1,4,"UT"],[2,4,"CO"],[3,4,"NE"],[4,4,"MO"],[5,4,"KY"],[6,4,"WV"],[7,4,"VA"],[8,4,"MD"],[9,4,"DE"],[1,5,"AZ"],[2,5,"NM"],[3,5,"KS"],[4,5,"AR"],[5,5,"TN"],[6,5,"NC"],[7,5,"SC"],[8,5,"DC"],[3,6,"OK"],[4,6,"LA"],[5,6,"MS"],[6,6,"AL"],[7,6,"GA"],[0,7,"HI"],[3,7,"TX"],[8,7,"FL"],[10,7,"PR"]]
)}

function _stateToCoords(states){return(
Object.fromEntries(states.map(([col, row, state]) => [state, {row, col}]))
)}

function _35(md){return(
md`As before, we will set row and column values to each object in the dataset.`
)}

function _unemploymentRatesGrid(unemploymentData,stateToAbbr,stateToCoords){return(
unemploymentData.map(({state, rates}) => {
  const abbr = stateToAbbr[state];
  const {row, col} = stateToCoords[abbr];
  return { state: abbr, row, col, rates };
})
)}

function _37(md){return(
md`### Dimensions

Like the basic grid cartogtam, we get the number of rows and columns in the grid.`
)}

function _numRows(d3,unemploymentRatesGrid){return(
d3.max(unemploymentRatesGrid, d => d.row) + 1
)}

function _numCols(d3,unemploymentRatesGrid){return(
d3.max(unemploymentRatesGrid, d => d.col) + 1
)}

function _margin(){return(
{ top: 30, left: 30, right: 30, bottom: 30 }
)}

function _41(md){return(
md`For this map, we'll make it responsive to changes in screen size. We'll say that the map can have a max width of \`width\` minus the margins and a max height of 650 pixels minus the margins. With this, we can calculate the size of a grid cell, given the number of rows and columns.`
)}

function _gridCellSize(width,margin,numCols,numRows){return(
Math.min(
  (width - margin.left - margin.right) / numCols,
  (650 - margin.left - margin.right) / numRows
)
)}

function _gridWidth(numCols,gridCellSize,margin){return(
numCols * gridCellSize + margin.left + margin.right
)}

function _gridHeight(numRows,gridCellSize,margin){return(
numRows * gridCellSize + margin.bottom + margin.top
)}

function _45(md){return(
md`### Scales

With this, we can create our band scales to place the small charts according to their row and column.`
)}

function _gridRow(d3,numRows,margin,gridHeight){return(
d3.scaleBand()
  .domain(d3.range(numRows))
  .range([margin.top, gridHeight - margin.bottom])
  .padding(0.15)
)}

function _gridCol(d3,numCols,margin,gridWidth){return(
d3.scaleBand()
  .domain(d3.range(numCols))
  .range([margin.left, gridWidth - margin.right])
  .padding(0.15)
)}

function _48(md){return(
md`Next, calculate the maximum unemployment rate for any state and any month. Use it to finish the definition of the \`y\` scale.`
)}

function _maxUnemploymentRate(d3,unemploymentData){return(
d3.max(unemploymentData, state => d3.max(state.rates, d => d.rate))
)}

function _y(d3,maxUnemploymentRate,gridRow){return(
d3.scaleLinear()
  .domain([0, maxUnemploymentRate])
  .range([gridRow.bandwidth(), 0])
)}

function _51(md){return(
md`Next, get the minimum and maximum dates and use it to create the \`x\` scale.`
)}

function _dateExtent(d3,unemploymentData){return(
d3.extent(unemploymentData[0].rates, d => d.date)
)}

function _x(d3,dateExtent,gridCol){return(
d3.scaleTime()
  .domain(dateExtent)
  .range([0, gridCol.bandwidth()])
)}

function _54(md){return(
md`### Generator

We now need an area generator to draw the areas. There is no data for Puerto Rico for March and April of 2020, so we pass a function to [\`defined()\`](https://d3js.org/d3-shape/line#line_defined) to handle this. Complete the line definition below.`
)}

function _area(d3,x,y){return(
d3.area()
  .x(d => x(d.date))
  .y1(d => y(d.rate))
  .y0(y(0))
  .defined(d => d.rate !== null)
)}

function _56(md){return(
md`### Axes`
)}

function _xAxis(d3,x){return(
d3.axisBottom(x)
  .tickSizeOuter(0) // don't include ticks for the max values
  .ticks(4, "'%y")
)}

function _yAxis(d3,y){return(
d3.axisLeft(y)
  .tickSizeOuter(0)
  .ticks(4)
)}

function _59(md){return(
md`### Visualization`
)}

function _gridCartogramArea(d3,gridWidth,gridHeight,margin,dateExtent,unemploymentRatesGrid,gridCol,gridRow,area,y,xAxis,yAxis)
{
  // the usual set up
  
  const svg = d3.create('svg')
      .attr('width', gridWidth)
      .attr('height', gridHeight)
      .attr('font-family', 'sans-serif');
  
  // title
  const format = d3.timeFormat('%B %Y');
  svg.append('text')
      .attr('y', margin.top)
      .text(`Unemployment Rate, ${format(dateExtent[0])} - ${format(dateExtent[1])}`);
  
  // Add a group for each cell and position it according to its row and column
  
  const cells = svg.selectAll('g')
    .data(unemploymentRatesGrid)
    .join('g')
      .attr('transform', d => `translate(${gridCol(d.col)}, ${gridRow(d.row)})`);
  
  // Add the area to each cell. Set the fill to "steelblue"
  
  cells.append('path')
      .attr('d', d => area(d.rates))
      .attr('fill', 'steelblue');
  
  // Add the state label to each cell
  
  cells.append('text')
      .attr('font-size', 12)
      .attr('dominant-baseline', 'middle')
      .attr('x', 5)
      .attr('y', y(20))
      .text(d => d.state);
  
  // Axes
  
  // add x axes to each chart
  const xAxes = cells.append('g')
    // move it to the bottom
    .attr('transform', d => `translate(0,${gridRow.bandwidth()})`)
    .call(xAxis)
    // remove the baseline
    .call(g => g.select('.domain').remove())
    // change the tick color to gray
    .call(g => g.selectAll('line').attr('stroke', '#c0c0c0'));
  
  // remove tick labels from all charts except the one for Alaska
  xAxes.filter(d => d.state !== 'AK')
    .selectAll('text')
    .remove();
  
  // add y axes to each chart
  const yAxes = cells.append('g')
    .call(yAxis)
    // remove the baseline
    .call(g => g.select('.domain').remove())
    // change the tick color to gray
    .call(g => g.selectAll('line').attr('stroke', '#c0c0c0'));
  
  // remove tick labels from all charts except the one for Alaska.
  yAxes.filter(d => d.state !== 'AK')
    .selectAll('text')
    .remove();
  
  return svg.node();
}


function _61(md){return(
md`---

## Appendix`
)}

function _d3(require){return(
require('d3@7')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["nyt-grid-cartogram.png", {url: new URL("./files/6c247654e2ab06ff88263b0f241ab72e49fe33407f891260bfc4f35c530c7edb639374200de23e0deec8bfa379faa7246fccbc3c267e5358879c08128fde1cc9.png", import.meta.url), mimeType: "image/png", toString}],
    ["cbs-grid-cartogram.png", {url: new URL("./files/40cb8af1b197e694a192a215127889d0b2aef0e23b2a74d3f57c41f3f5bf8cf23246f220644490676dbe5cb2f8c0c12c8eff4a51eb13caf0795dfc9f8511eac7.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["unemployment"], _3);
  main.variable(observer()).define(["stateToAbbr"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("stateGrid")).define("stateGrid", _stateGrid);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("stateToPosition")).define("stateToPosition", ["stateGrid"], _stateToPosition);
  main.variable(observer()).define(["stateToPosition"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("unemploymentWithPosition")).define("unemploymentWithPosition", ["unemployment","stateToAbbr","stateToPosition"], _unemploymentWithPosition);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("numberOfRows")).define("numberOfRows", ["d3","unemploymentWithPosition"], _numberOfRows);
  main.variable(observer("numberOfCols")).define("numberOfCols", ["d3","unemploymentWithPosition"], _numberOfCols);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("cellSize")).define("cellSize", _cellSize);
  main.variable(observer("mapWidth")).define("mapWidth", ["numberOfCols","cellSize"], _mapWidth);
  main.variable(observer("mapHeight")).define("mapHeight", ["numberOfRows","cellSize"], _mapHeight);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("row")).define("row", ["d3","numberOfRows","mapHeight"], _row);
  main.variable(observer("col")).define("col", ["d3","numberOfCols","mapWidth"], _col);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("minMaxRate")).define("minMaxRate", ["d3","unemployment"], _minMaxRate);
  main.variable(observer("color")).define("color", ["d3","minMaxRate"], _color);
  main.variable(observer()).define(["legend","color"], _25);
  main.variable(observer("gridCartogram")).define("gridCartogram", ["d3","mapWidth","mapHeight","unemploymentWithPosition","col","row","color"], _gridCartogram);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["stateUnemploymentDecade"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["unemploymentData"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("states")).define("states", _states);
  main.variable(observer("stateToCoords")).define("stateToCoords", ["states"], _stateToCoords);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("unemploymentRatesGrid")).define("unemploymentRatesGrid", ["unemploymentData","stateToAbbr","stateToCoords"], _unemploymentRatesGrid);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("numRows")).define("numRows", ["d3","unemploymentRatesGrid"], _numRows);
  main.variable(observer("numCols")).define("numCols", ["d3","unemploymentRatesGrid"], _numCols);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("gridCellSize")).define("gridCellSize", ["width","margin","numCols","numRows"], _gridCellSize);
  main.variable(observer("gridWidth")).define("gridWidth", ["numCols","gridCellSize","margin"], _gridWidth);
  main.variable(observer("gridHeight")).define("gridHeight", ["numRows","gridCellSize","margin"], _gridHeight);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("gridRow")).define("gridRow", ["d3","numRows","margin","gridHeight"], _gridRow);
  main.variable(observer("gridCol")).define("gridCol", ["d3","numCols","margin","gridWidth"], _gridCol);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("maxUnemploymentRate")).define("maxUnemploymentRate", ["d3","unemploymentData"], _maxUnemploymentRate);
  main.variable(observer("y")).define("y", ["d3","maxUnemploymentRate","gridRow"], _y);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer("dateExtent")).define("dateExtent", ["d3","unemploymentData"], _dateExtent);
  main.variable(observer("x")).define("x", ["d3","dateExtent","gridCol"], _x);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("area")).define("area", ["d3","x","y"], _area);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("xAxis")).define("xAxis", ["d3","x"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["d3","y"], _yAxis);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer("gridCartogramArea")).define("gridCartogramArea", ["d3","gridWidth","gridHeight","margin","dateExtent","unemploymentRatesGrid","gridCol","gridRow","area","y","xAxis","yAxis"], _gridCartogramArea);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  const child2 = runtime.module(define2);
  main.import("unemployment", child2);
  main.import("stateToAbbr", child2);
  const child3 = runtime.module(define3);
  main.import("stateUnemploymentDecade", child3);
  main.import("unemploymentData", child3);
  return main;
}
