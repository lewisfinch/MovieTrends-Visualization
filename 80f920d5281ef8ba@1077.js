import define1 from "./606721ba06ae51d6@563.js";
import define2 from "./a33468b95d0b15b0@817.js";
import define3 from "./e63c207b5f5c4f9f@679.js";

function _1(md){return(
md`# Small Multiples

This notebook shows a couple of strategies for creating [small multiples](https://en.wikipedia.org/wiki/Small_multiple), where we repeat the same visualization with different data. We typically arrange the visualizations in a grid. With this approach, we will assign each object in our dataset a row and a column. Note that this is not needed if the position of the small multiples is based on attributes that are already in the dataset, like in a matrix. If the small multiples are arranged according to defined axes, then creating the row and column positions is not needed.`
)}

function _2(md){return(
md`## Words and Letters

For our first example, our data contains one object for each letter of the alphabet and each object has a list of three words that begin with that letter. Our goal is to create a grid that has one cell for each letter, which lists the words for that letter.`
)}

function _lettersAndWords(){return(
[
  { letter: 'A', words: ['apple', 'awesome', 'amazing'] },
  { letter: 'B', words: ['bagel', 'busy', 'bark'] },
  { letter: 'C', words: ['celery', 'cable', 'computer'] },
  { letter: 'D', words: ['doodle', 'dawn', 'drive'] },
  { letter: 'E', words: ['eggs', 'elbow', 'easy'] },
  { letter: 'F', words: ['fruit', 'friends', 'fox'] },
  { letter: 'G', words: ['giraffe', 'great', 'gray'] },
  { letter: 'H', words: ['hello', 'here', 'hollow'] },
  { letter: 'I', words: ['icicle', 'igloo', 'inertia'] },
  { letter: 'J', words: ['joke', 'jolt', 'java'] },
  { letter: 'K', words: ['kindle', 'kick', 'kilt'] },
  { letter: 'L', words: ['lemur', 'llama', 'lion'] },
  { letter: 'M', words: ['maybe', 'moose', 'monsoon'] },
  { letter: 'N', words: ['never', 'nobody', 'next'] },
  { letter: 'O', words: ['outside', 'orange', 'ocelot'] },
  { letter: 'P', words: ['pizza', 'pasta', 'please'] },
  { letter: 'Q', words: ['quiz', 'queue', 'quest'] },
  { letter: 'R', words: ['rice', 'roses', 'ranch'] },
  { letter: 'S', words: ['serious', 'silly', 'sound'] },
  { letter: 'T', words: ['tuna', 'taco', 'triangle'] },
  { letter: 'U', words: ['undo', 'union', 'uncle'] },
  { letter: 'V', words: ['vroom', 'vehicle', 'very'] },
  { letter: 'W', words: ['water', 'when', 'who'] },
  { letter: 'X', words: ['xenial', 'xylophone', 'xenolith'] },
  { letter: 'Y', words: ['yes', 'yours', 'year'] },
  { letter: 'Z', words: ['zoo', 'zebra', 'zero'] },
]
)}

function _4(md){return(
md`### Dimensions`
)}

function _wordsMargin(){return(
{ top: 10, bottom: 10, right: 10, left: 10 }
)}

function _wordsWidth(width){return(
width
)}

function _wordsHeight(){return(
500
)}

function _8(md){return(
md`### Scales

We will create two band scales that we will use to place the cells into the grid.

\`d3.range(x)\` returns an array containing the numbers 0 through \`x-1\``
)}

function _numberOfCols(){return(
7
)}

function _10(d3,numberOfCols){return(
d3.range(numberOfCols)
)}

function _11(md){return(
md`[\`paddingInner\`](/@d3/d3-scaleband) takes a value between 0 and 1 that determines the amount of space between the bands.`
)}

function _colScale(d3,numberOfCols,wordsMargin,wordsWidth){return(
d3.scaleBand()
      .domain(d3.range(numberOfCols))
      .range([wordsMargin.left, wordsWidth - wordsMargin.right])
      .padding(0.05)
)}

function _numberOfRows(){return(
4
)}

function _rowScale(d3,numberOfRows,wordsMargin,wordsHeight){return(
d3.scaleBand()
      .domain(d3.range(numberOfRows))
      .range([wordsMargin.top, wordsHeight - wordsMargin.bottom])
      .padding(0.05)
)}

function _15(md){return(
md`We can use these scales to get the (x, y) coordinates of the top-left corner of a cell in the grid by passing the row index to the \`rowScale\` and column index to the \`colScale\`. For example, we can get the (x, y) coordinates for the cell in the 4th column and 1st row.`
)}

function _16(colScale,rowScale){return(
[colScale(3), rowScale(0)]
)}

function _17(md){return(
md`In addition, \`rowScale.bandwidth()\` gives the height of a cell in the grid and \`colScale.bandwidth()\` gives the width of a cell in the grid.`
)}

function _18(md){return(
md`### Visualization`
)}

function _19(d3,wordsWidth,wordsHeight,lettersAndWords,numberOfCols,colScale,rowScale)
{
  // the usual set up
  
  const svg = d3.create('svg')
      .attr('width', wordsWidth)
      .attr('height', wordsHeight);
  
  // add a group for each cell and position it according to its row and column
  
  const cells = svg.selectAll('g')
    .data(lettersAndWords)
    .join('g')
      .attr('transform', (d, i) => {
        /* i is the current index
           in this case, the value of i will be from 0-25. */
        
        // get the row index and column index for this cell
        const r = Math.floor(i / numberOfCols);
        const c = i % numberOfCols;
        
        // use the scales to get the x, y coordinates
        return `translate(${colScale(c)}, ${rowScale(r)})`;
      });
  
  // add a rectangle to each group and make it take up the entire cell
  
  cells.append('rect')
      .attr('width', colScale.bandwidth())
      .attr('height', rowScale.bandwidth())
      .attr('fill', 'white')
      .attr('stroke', 'red');

  // nested data join
  // add the list of words to each group
  
  cells.selectAll('text')
    .data(d => d.words)
    .join('text')
      .attr('font-size', 15)
      .attr('font-family', 'sans-serif')
      .attr('dominant-baseline', 'hanging')
      .attr('x', 5)
      .attr('y', (d, i) => i * 15 + 2)
      .text(d => d);
  
  return svg.node();
}


function _20(md){return(
md`### Assigning grid positions

Rather than calculating the row and column for a cell based on its index, we can also assign each object its row and column ahead of time.

We'll introduce a couple of new D3 functions to help us transform our data.

[\`d3.cross\`](/@d3/d3-cross) returns the cartesian product of two arrays. It results in pairs of elements from the first array with elements from the second array.`
)}

function _21(d3){return(
d3.cross([0, 1, 2], ['a', 'b', 'c'])
)}

function _22(md){return(
md`We can also pass a function that allows us to change how the pairs are represented in the array.`
)}

function _23(d3){return(
d3.cross([0, 1, 2], ['a', 'b', 'c'], (number, letter) => `${number} - ${letter}`)
)}

function _24(d3){return(
d3.cross([0, 1, 2], ['a', 'b', 'c'], (number, letter) => ({ number, letter}))
)}

function _25(md){return(
md`[\`d3.zip\`](/@d3/d3-transpose) combines two arrays.`
)}

function _26(d3){return(
d3.zip([0, 1, 2], ['cat', 'dog', 'mouse'])
)}

function _27(md){return(
md`We will use \`d3.cross\` to create an array of positions in this grid.`
)}

function _gridPositions(d3,numberOfRows,numberOfCols){return(
d3.cross(d3.range(numberOfRows), d3.range(numberOfCols), (row, col) => ({row, col}))
)}

function _29(md){return(
md`We will then use \`d3.zip\` to combine this array of grid positions with our data, so that each object in our dataset is paired with a grid position.`
)}

function _pairings(d3,lettersAndWords,gridPositions){return(
d3.zip(lettersAndWords, gridPositions)
)}

function _31(md){return(
md`We can use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) to merge these objects. Now each object in our dataset has an assigned row and column.`
)}

function _data(pairings){return(
pairings.map(([data, position]) => ({...data, ...position}))
)}

function _33(md){return(
md`### Visualization`
)}

function _34(d3,wordsWidth,wordsHeight,data,colScale,rowScale)
{
  // the usual set up
  const svg = d3.create('svg')
      .attr('width', wordsWidth)
      .attr('height', wordsHeight);
  
  // add a group for each cell and position it according to its row and column
  
  const cells = svg.selectAll('g')
    .data(data)
    .join('g')
      .attr('transform', d => `translate(${colScale(d.col)}, ${rowScale(d.row)})`);
  
  // add a rectangle to each group and make it take up the entire cell
  
  cells.append('rect')
      .attr('width', colScale.bandwidth())
      .attr('height', rowScale.bandwidth())
      .attr('fill', 'white')
      .attr('stroke', 'red');

  // nested data join
  // add the list of words to each group
  
  cells.selectAll('text')
    .data(d => d.words)
    .join('text')
      .attr('font-size', 15)
      .attr('font-family', 'sans-serif')
      .attr('dominant-baseline', 'hanging')
      .attr('x', 5)
      .attr('y', (d, i) => i * 15 + 2)
      .text(d => d);
  
  return svg.node();
}


function _35(md){return(
md`## Small multiples area charts

The previous example highlights the technique, but it isn't a very interesting visualization. Let's see how we can use the same approach to show area charts to that visualize unemployment rates for each state over time.`
)}

function _36(md){return(
md`### Data

Our data comes from the [Bureau of Labor Statistics](https://www.bls.gov/charts/state-employment-and-unemployment/state-unemployment-rates-animated.htm). The data comes as a CSV file with one row for each state and a column for each month.`
)}

function _unemploymentRaw(FileAttachment){return(
FileAttachment("unemployment-state-decade.csv").csv({ typed: true })
)}

function _38(md){return(
md`To make this data easier to visualize, we will turn it in to an array of objects, one per state. Each object will contain the name of a state and an array that contains the state's unemployment rate for each month.`
)}

function _unemploymentData(unemploymentRaw,d3){return(
unemploymentRaw.map(d => {
  const state = d.State;

  // function to parse a string like "Jun 2011" into a date
  const parse = d3.timeParse('%b %Y');

  // map over the date keys for a given state
  const rates = Object.entries(d)
    .filter(([key, value]) => key !== 'State')
    .map(([date, rate]) => ({
      date: parse(date),
      // if there is no data, the value is '-'
      // we will replace this with null
      rate: rate === '-' ? null : rate
    }))
    .sort((a, b) => d3.ascending(a.date, b.date));

  // mean unemployment rate for the state
  const average = d3.mean(rates, d => d.rate);
  
  return { state, rates, average };
})
// sort the states by their mean unemployment rate
.sort((a, b) => d3.descending(a.average, b.average))
)}

function _40(md){return(
md`Lastly, we have a mapping from state name to abbreviation. This data is from [World Population Review](https://worldpopulationreview.com/states/state-abbreviations/).`
)}

function _41(stateToAbbr){return(
stateToAbbr
)}

function _42(md){return(
md`### Dimensions`
)}

function _unemploymentMargin(){return(
{ top: 30, bottom: 20, right: 10, left: 30 }
)}

function _unemploymentWidth(width){return(
width
)}

function _unemploymentHeight(){return(
600
)}

function _46(md){return(
md`### Scales

Next, we will create scales to place the area charts in the grid.`
)}

function _numRows(){return(
7
)}

function _row(d3,numRows,unemploymentMargin,unemploymentHeight){return(
d3.scaleBand()
  .domain(d3.range(numRows))
  .range([unemploymentMargin.top, unemploymentHeight - unemploymentMargin.bottom])
  .padding(0.05)
)}

function _numCols(unemploymentData,numRows){return(
Math.ceil(unemploymentData.length / numRows)
)}

function _col(d3,numCols,unemploymentMargin,unemploymentWidth){return(
d3.scaleBand()
  .domain(d3.range(numCols))
  .range([unemploymentMargin.left, unemploymentWidth - unemploymentMargin.right])
  .padding(0.1)
)}

function _51(md){return(
md`Next, we have \`x\` and \`y\` scales that will be used to draw each line chart. \`row.bandwidth()\` gives the height of a cell in the grid and \`col.bandwidth()\` gives the width of a cell in the grid.`
)}

function _maxUnemploymentRate(d3,unemploymentData){return(
d3.max(unemploymentData, state => d3.max(state.rates, d => d.rate))
)}

function _y(d3,maxUnemploymentRate,row){return(
d3.scaleLinear()
  .domain([0, maxUnemploymentRate])
  .range([row.bandwidth(), 0])
)}

function _dateExtent(d3,unemploymentData){return(
d3.extent(unemploymentData[0].rates, d => d.date)
)}

function _x(d3,dateExtent,col){return(
d3.scaleTime()
  .domain(dateExtent)
  .range([0, col.bandwidth()])
)}

function _56(md){return(
md`### Generator

Next, we need an area generator to draw the areas. There is no data for Puerto Rico for March and April of 2020, so we pass a function to [\`defined()\`](https://d3js.org/d3-shape/area#area_defined) to handle this.`
)}

function _area(d3,x,y){return(
d3.area()
  .x(d => x(d.date))
  .y1(d => y(d.rate))
  .y0(d => y(0))
  .defined(d => d.rate !== null)
)}

function _58(md){return(
md`### Axes`
)}

function _xAxis(d3,x){return(
d3.axisBottom(x)
  .tickSizeOuter(0)
  .ticks(4, "'%y")
)}

function _yAxis(d3,y){return(
d3.axisLeft(y)
  .tickSizeOuter(0)
  .ticks(4)
)}

function _61(md){return(
md`### Visualization`
)}

function _stateUnemploymentDecade(d3,unemploymentWidth,unemploymentHeight,unemploymentMargin,dateExtent,unemploymentData,numCols,col,row,area,y,stateToAbbr,xAxis,yAxis)
{
  // set up
  const svg = d3.create('svg')
      .attr('width', unemploymentWidth)
      .attr('height', unemploymentHeight)
      .attr('font-family', 'sans-serif');
  
  // title
  const format = d3.timeFormat('%B %Y'); // convert date to string
  svg.append('text')
      .attr('y', unemploymentMargin.top)
      .text(`Unemployment Rate, ${format(dateExtent[0])} - ${format(dateExtent[1])}`);
  
  // add a group for each cell and position it according to its row and column
  
  const cells = svg.selectAll('g')
    .data(unemploymentData)
    .join('g')
      .attr('transform', (d, i) => {
        /* i is the current index
           in this case, the value of i will be from 0-25. */
        
        // get the row index and column index for this cell
        const r = Math.floor(i / numCols);
        const c = i % numCols;
        
        // use the scales to get the x, y coordinates
        return `translate(${col(c)}, ${row(r)})`;
      });
  
  // add the area to each cell
  
  cells.append('path')
      .attr('d', d => area(d.rates))
      .attr('fill', 'steelblue');
  
  // add the state label to each cell
  
  cells.append('text')
      .attr('font-size', 12)
      .attr('dominant-baseline', 'middle')
      .attr('x', 5)
      .attr('y', y(20))
      .text(d => stateToAbbr[d.state])
  
  // Axes
  
  // add x axes to each chart
  const xAxes = cells.append('g')
      // move it to the bottom
      .attr('transform', d => `translate(0,${row.bandwidth()})`)
      .call(xAxis)
      // remove the baseline
      .call(g => g.select('.domain').remove())
      // change the tick color to gray
      .call(g => g.selectAll('line').attr('stroke', '#c0c0c0'));
  
  // remove tick labels from all charts except the ones at the bottom of the columns
  xAxes.filter((d, i) => i < unemploymentData.length - numCols)
    .selectAll('text')
    .remove();
  
  // add y axes to each chart
  const yAxes = cells.append('g')
      .call(yAxis)
      // remove the baseline
      .call(g => g.select('.domain').remove())
      // change the tick color to gray
      .call(g => g.selectAll('line').attr('stroke', '#c0c0c0'));
  
  // remove tick labels from all charts except the first column
  yAxes.filter((d, i) => i % numCols !== 0)
    .selectAll('text')
    .remove();
  
  return svg.node();
}


function _63(md){return(
md`### Assigning grid positions

Here's what it would look like with the other approach where we assign each object in the dataset a row and column.`
)}

function _grid(d3,numRows,numCols){return(
d3.cross(d3.range(numRows), d3.range(numCols), (row, col) => ({row, col}))
)}

function _unemploymentGrid(d3,unemploymentData,grid){return(
d3.zip(unemploymentData, grid)
  .map(([data, position]) => ({...data, ...position}))
)}

function _66(d3,unemploymentWidth,unemploymentHeight,unemploymentMargin,dateExtent,unemploymentGrid,col,row,area,y,stateToAbbr,xAxis,unemploymentData,numCols,yAxis)
{
  // set up
  const svg = d3.create('svg')
      .attr('width', unemploymentWidth)
      .attr('height', unemploymentHeight)
      .attr('font-family', 'sans-serif');
  
  // title
  const format = d3.timeFormat('%B %Y'); // convert date to string
  svg.append('text')
      .attr('y', unemploymentMargin.top)
      .text(`Unemployment Rate, ${format(dateExtent[0])} - ${format(dateExtent[1])}`);
  
  // add a group for each cell and position it according to its row and column
  
  const cells = svg.selectAll('g')
    .data(unemploymentGrid)
    .join('g')
      .attr('transform', d => `translate(${col(d.col)}, ${row(d.row)})`);
  
  // add the area to each cell
  
  cells.append('path')
      .attr('d', d => area(d.rates))
      .attr('fill', 'steelblue');
  
  // add the state label to each cell
  
  cells.append('text')
      .attr('font-size', 12)
      .attr('dominant-baseline', 'middle')
      .attr('x', 5)
      .attr('y', y(20))
      .text(d => stateToAbbr[d.state])
  
  // Axes
  
  // add x axes to each chart
  const xAxes = cells.append('g')
    // move it to the bottom
    .attr('transform', d => `translate(0,${row.bandwidth()})`)
    .call(xAxis)
    // remove the baseline
    .call(g => g.select('.domain').remove())
    // change the tick color to gray
    .call(g => g.selectAll('line').attr('stroke', '#c0c0c0'));
  
  // remove tick labels from all charts except the ones at the bottom of the columns
  xAxes.filter((d, i) => i < unemploymentData.length - numCols)
    .selectAll('text')
    .remove();
  
  // add y axes to each chart
  const yAxes = cells.append('g')
    .call(yAxis)
    // remove the baseline
    .call(g => g.select('.domain').remove())
    // change the tick color to gray
    .call(g => g.selectAll('line').attr('stroke', '#c0c0c0'));
  
  // remove tick labels from all charts except the first column
  yAxes.filter(d => d.col !== 0)
    .selectAll('text')
    .remove();
  
  return svg.node();
}


function _67(md){return(
md`## More Examples

### Area, bar, and pie charts

The [Graphical Encoding Examples](/@nyuvis/graphical-encoding-examples) notebook contains small multiples of area charts, bar charts, and pie charts. 

### Speedometer Charts

The second example from the [Graphical Encoding Exercise](/@nyuvis/graphical-encoding-exercise) uses the approach explained in this notebook to create the small multiples of the speedometer charts.`
)}

function _68(speedometer){return(
speedometer
)}

function _69(md){return(
md`### Grid Cartogram

In the [practice exercise for small multiples](/@nyuvis/small-multiples-practice), we create the below grid cartogram.`
)}

function _70(legend,color){return(
legend({
  color: color,
  title: 'Unemployment Rate, Decemeber 2019'
})
)}

function _71(gridCartogram){return(
gridCartogram
)}

function _72(md){return(
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
    ["unemployment-state-decade.csv", {url: new URL("./files/67a7b418b4ccc75f711f176b39f5b1b2ffd0e825a8ac2180dc3f8d91994df7f35a59bfb2dfe763bef45a25d9529af5f8dde30691f68861b3d518f9e635d8ca34.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("lettersAndWords")).define("lettersAndWords", _lettersAndWords);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("wordsMargin")).define("wordsMargin", _wordsMargin);
  main.variable(observer("wordsWidth")).define("wordsWidth", ["width"], _wordsWidth);
  main.variable(observer("wordsHeight")).define("wordsHeight", _wordsHeight);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("numberOfCols")).define("numberOfCols", _numberOfCols);
  main.variable(observer()).define(["d3","numberOfCols"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("colScale")).define("colScale", ["d3","numberOfCols","wordsMargin","wordsWidth"], _colScale);
  main.variable(observer("numberOfRows")).define("numberOfRows", _numberOfRows);
  main.variable(observer("rowScale")).define("rowScale", ["d3","numberOfRows","wordsMargin","wordsHeight"], _rowScale);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["colScale","rowScale"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["d3","wordsWidth","wordsHeight","lettersAndWords","numberOfCols","colScale","rowScale"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["d3"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["d3"], _23);
  main.variable(observer()).define(["d3"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["d3"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("gridPositions")).define("gridPositions", ["d3","numberOfRows","numberOfCols"], _gridPositions);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("pairings")).define("pairings", ["d3","lettersAndWords","gridPositions"], _pairings);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("data")).define("data", ["pairings"], _data);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["d3","wordsWidth","wordsHeight","data","colScale","rowScale"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("unemploymentRaw")).define("unemploymentRaw", ["FileAttachment"], _unemploymentRaw);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("unemploymentData")).define("unemploymentData", ["unemploymentRaw","d3"], _unemploymentData);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["stateToAbbr"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("unemploymentMargin")).define("unemploymentMargin", _unemploymentMargin);
  main.variable(observer("unemploymentWidth")).define("unemploymentWidth", ["width"], _unemploymentWidth);
  main.variable(observer("unemploymentHeight")).define("unemploymentHeight", _unemploymentHeight);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("numRows")).define("numRows", _numRows);
  main.variable(observer("row")).define("row", ["d3","numRows","unemploymentMargin","unemploymentHeight"], _row);
  main.variable(observer("numCols")).define("numCols", ["unemploymentData","numRows"], _numCols);
  main.variable(observer("col")).define("col", ["d3","numCols","unemploymentMargin","unemploymentWidth"], _col);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer("maxUnemploymentRate")).define("maxUnemploymentRate", ["d3","unemploymentData"], _maxUnemploymentRate);
  main.variable(observer("y")).define("y", ["d3","maxUnemploymentRate","row"], _y);
  main.variable(observer("dateExtent")).define("dateExtent", ["d3","unemploymentData"], _dateExtent);
  main.variable(observer("x")).define("x", ["d3","dateExtent","col"], _x);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("area")).define("area", ["d3","x","y"], _area);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("xAxis")).define("xAxis", ["d3","x"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["d3","y"], _yAxis);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer("stateUnemploymentDecade")).define("stateUnemploymentDecade", ["d3","unemploymentWidth","unemploymentHeight","unemploymentMargin","dateExtent","unemploymentData","numCols","col","row","area","y","stateToAbbr","xAxis","yAxis"], _stateUnemploymentDecade);
  main.variable(observer()).define(["md"], _63);
  main.variable(observer("grid")).define("grid", ["d3","numRows","numCols"], _grid);
  main.variable(observer("unemploymentGrid")).define("unemploymentGrid", ["d3","unemploymentData","grid"], _unemploymentGrid);
  main.variable(observer()).define(["d3","unemploymentWidth","unemploymentHeight","unemploymentMargin","dateExtent","unemploymentGrid","col","row","area","y","stateToAbbr","xAxis","unemploymentData","numCols","yAxis"], _66);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer()).define(["speedometer"], _68);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer()).define(["legend","color"], _70);
  main.variable(observer()).define(["gridCartogram"], _71);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("speedometer", child1);
  const child2 = runtime.module(define2);
  main.import("legend", child2);
  const child3 = runtime.module(define1);
  main.import("unemployment", child3);
  main.import("stateToAbbr", child3);
  main.import("color", child3);
  const child4 = runtime.module(define3);
  main.import("gridCartogram", child4);
  return main;
}
