//configure the dimensions and margins of the graph
//referenced from https://leanpub.com/d3-t-and-t-v4/read
var graphSize = {top:30, bottom:30, right:30, left:100},
  width = 800 - graphSize.left - graphSize.right,
  height = 300 - graphSize.top - graphSize.bottom;

var parseDate = d3.timeParse("%Y-%m-%d");

d3.csv('https://raw.githubusercontent.com/phLeung/data_wrangling_challenge/master/data/daily_prices.csv')
.row(function(data){return {date:parseDate(data.Date),price:Number(data.Price)};})
.get(function(error,data)
{
  //find max price, min date, and max date
  var maxDate = d3.max(data,function(d){ return d.date;});
  var minDate = d3.min(data,function(d){ return d.date;});
  var maxPrice = d3.max(data,function(d){ return d.price;});
  var y = d3.scaleLinear().domain([0,maxPrice]).range([height,0]);
  var x = d3.scaleTime().domain([minDate,maxDate]).range([0,width]);
  //establish line
  var dailyPriceLine = d3.line()
  .x(function(d){ return x(d.date); })
  .y(function(d) { return y(d.price); });
  //append svg (scalable vector graphics) object to the body of the page
  var svg = d3.select("body").append("svg")
      .attr("width", width + graphSize.left + graphSize.right )
      .attr("height", height + graphSize.top + graphSize.bottom + 25)
  .append("g")
  .attr("transform", "translate(" + graphSize.left + "," + graphSize.top + ")");

  //add line path
  svg.append("path")
  .data([data])
  .attr("class", "lines")
  .attr("d", dailyPriceLine);

  //add x axis
  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

  //label for x axis
  svg.append("text")
  .attr("transform",
        "translate(" + (width/2) + " ," + (height+graphSize.top +5) + ")")
        .style("text-anchor", "middle")
  .text("Date");

  //add y axis
  svg.append("g")
  .call(d3.axisLeft(y));
  //label for y axis
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y",0-50)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Price");


});
