//set dimensions and margins of graph
var margin = {top: 40, right: 40, bottom: 40, left: 110},
    width = 560 - margin.left - margin.right,
    height = 510 - margin.top - margin.bottom;

//apend svg object to body of page
var svg = d3.select("#months").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var parseDate = d3.timeParse("%Y-%m-%d");
d3.csv("https://raw.githubusercontent.com/phLeung/data_wrangling_challenge/master/data/monthly_prices.csv")
.row(function(data){return {date:parseDate(data.Date),price:Number(data.Price)};})
.get(function(error,data)
{
   if(error) throw error;
   var maxDate = d3.max(data,function(d){ return d.date;});
   var minDate = d3.min(data,function(d){ return d.date;});
   var maxPrice = d3.max(data,function(d){ return d.price;});
   var y = d3.scaleLinear().domain([0,maxPrice]).range([height,0]);
   var x = d3.scaleTime().domain([minDate,maxDate]).range([0,width]);
   //establish line
   var monthlyPriceLine = d3.line()
   .x(function(d){ return x(d.date); })
   .y(function(d) { return y(d.price); });
   svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
   svg.append("g").call(d3.axisLeft(y));

   //add line
   svg.append("path").datum(data).attr("class","lines").attr("d",monthlyPriceLine);
   //label for x axis
   svg.append("text")
   .attr("transform",
         "translate(" + (width/2) + "," + (height+margin.top) + ")")
         .style("text-anchor", "middle")
   .text("Date");

   //add y axis
   svg.append("g")
   .call(d3.axisLeft(y));
   //label for y axis
   svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y",0-margin.left)
   .attr("x",0 - (height / 2))
   .attr("dy", "1em")
   .style("text-anchor", "middle")
   .text("Price");



});
