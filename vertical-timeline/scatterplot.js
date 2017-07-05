function scatterplot(){
	var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1360 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
	
	var x = d3.scale.linear()
	        .range([0,width]);
			 
	var y = d3.scale.linear()
            .range([height, 0]);
			
	var z = d3.scale.category10();
	
	
			
	var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	var tip_1= d3.tip()
                 .attr('class', 'd3-tip')
                 .offset([-10, 0])
                 .style("fill",function(d,i){return z(i)})
                 .html(function(d) {
    return  "  <span style ='color:#ffeda0'>"+d.Country+"</span>"+"</br>"+"Per Capita GNI:   <span style ='color:#fc8d59'>"+d.GNI+"</span>"+
	"</br>"+"Cash-GDP ratio:    <span style ='color:#fc8d59'>"+d.Cash+"</span>"});
	
    var tip_2=d3.tip()
                .attr('class','d3-tip_1')
	            .offset([-10,0])
	            .style("fill",function(d,i){return z(i)})
	            .html(function(d){
	   return  "  <span style ='color:#ffeda0'>"+d.Country+"</span>"+"</br>"+"Per Capita GNI:    <span style ='color:#91cf60'>"+d.GNI+"</span>"+
	          "</br>"+"CPI:   <span style ='color:#91cf60'>"+d.sca_cpi+"</span>"});


	

   
svg.call(tip_1);
svg.call(tip_2);
	
	//upload csv.
    d3.csv("Country_currency_to_gdp_ratio.csv", function( data) {        // a function that takes 2 argument 'error' and 'data'.
            data.map(function(d){
                 d.GNI=+d["GNI"];
                 d.Cash= +d["Cash"];
                 d.sca_cpi= +d["sca_cpi"];
                 d.Country= d["Country"]; 
				 d.id=d["id"];
				 console.log(d.Country);
				 
				 
	})
	x.domain(d3.extent(data,function(d){return d.GNI ;})).nice();
	y.domain(d3.extent(data,function(d){return d.Cash ;})).nice();
	
	// Add the x-axis.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .text("Per Capita GNI")
	  .call(d3.svg.axis().scale(x).orient("bottom").tickPadding(10))
	  .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
	  .style("opacity",1)
	  .style("fill","black")
      .text("Per Capita GNI");

  // Add the y-axis.
  svg.append("g")
      .attr("class", "y axis")
	  .text("Cash","CPI")
      .call(d3.svg.axis().scale(y).orient("left").tickPadding(10))
	  .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
	  .attr("y", 6)
	  .style("opacity",1)
      .attr("dy", ".50em")
      .style("text-anchor", "end")
	  .style("fill","black")
      .text("Corruption  /   Cash")
	  ;

//Add the line joining the points.	  
svg.selectAll("lines")
   .data(data).enter()
   .append("line")
   .attr("class","line")
   .attr("id","line")
   .attr("x1",function(d){return x(+d["GNI"])})
   .attr("y1",function(d){return y(+d["Cash"])})
   .attr("x2",function(d){return x(+d["GNI"])})
   .attr("y2",function(d){return y(+d["sca_cpi"])})
   .style("stroke","black")
   .style("stroke-width",0.5)
   .style("opacity",1);
   
   
//Add the points.
svg.selectAll("points")
   .data(data).enter()
   .append("circle")
   .attr("class","cash")
   .attr("id","bluedot")
   .attr("cx",function(d){return x(+d["GNI"])})
   .attr("cy",function(d){return y(+d["Cash"])})
   .attr("r",4.5)
   .style("fill","blue")
   .style("fill-opacity",0)
   .style("stroke","black")
   .style("stroke-width",2)
   .style("opacity",1)
   ;
//Add the points.
svg.selectAll("points_1")
   .data(data).enter()
   .append("circle")
   .attr("class","cash1")
   .attr("id","bluedot1")
   .attr("cx",function(d){return x(+d["GNI"])})
   .attr("cy",function(d){return y(+d["Cash"])})
   .attr("r",4.5)
   .style("fill","#fc8d59")
   .style("opacity",1)
   .on('mouseover',function(d){
                           
							tip_1.show(d);})
   .on('mouseout',function(d){
	                        
							tip_1.hide(d);})
   ;
   
   
   
svg.selectAll("points_1")
   .data(data).enter()
   .append("circle")
   .attr("class","cpi")
   .attr("id","greendot")
   .attr("cx",function(d){return x(+d["GNI"])})
   .attr("cy",function(d){return y(+d["sca_cpi"])})
   .attr("r",4.5)
   .style("fill","#91cf60")
   .style("opacity",1)
   .on('mouseover',function(d){
	                        
							tip_2.show(d);})
   .on('mouseout',function(d){ 
                            
							tip_2.hide(d);});
   
 //Add the text for Cash.  
svg.selectAll(".text")
   .data(data).enter()
   .append("text")
   .attr("class","text")
   .attr("id","text")
   .attr("x",function(d){return x(+d["GNI"])+10;})
   .attr("y",function(d){return y(+d["Cash"])+10;})
   .style("font_family","sans-serif")
   .style("font-size","8px")
   .style("color","black")
   .style("opacity",1)
   .text(function(d){return d["id"]});
   

//Add the text for Corruption.  
svg.selectAll(".text1")
   .data(data).enter()
   .append("text")
   .attr("class","text1")
   .attr("id","text1")
   .attr("x",function(d){return x(+d["GNI"])+10;})
   .attr("y",function(d){return y(+d["sca_cpi"])+10;})
   .style("font_family","sans-serif")
   .style("font-size","8px")
   .style("color","black")
   .style("opacity",0)
   .text(function(d){return d["id"]});
   

   
var body = d3.select("body")

var form = body.append('form');

form.append('input')
    .attr("class","radio1")
    .attr('type', 'radio')
	.attr('checked','checked')
    .attr('value', 'Or')
	.attr('name', 'toggle')
	.on('click', function () {
		d3.selectAll(".cash").transition().duration(2000).delay(250).ease("linear").attr("cy",function(d){return y(d.Cash)});
		d3.selectAll(".text").transition().duration(2000).delay(250).ease("linear").style("opacity",1);
		d3.selectAll(".text1").transition().duration(2000).delay(250).ease("linear").style("opacity",0);
		
    });

form.append('label')
    .html('Cash');

form.append('input')
    .attr("class","radio2")
    .attr('type', 'radio')
    .attr('value', 'And')
	.attr('name', 'toggle')
	.on('click', function () {
        d3.selectAll(".cash").transition().duration(2000).delay(250).ease("linear").attr("cy",function(d){return y(d.sca_cpi)});
		d3.selectAll(".text1").transition().duration(2000).delay(250).ease("linear").style("opacity",1);
		d3.selectAll(".text").transition().duration(2000).delay(250).ease("linear").style("opacity",0);
		
    });

form.append('label')
    .html('Corruption');
	  
	  });
	  

}