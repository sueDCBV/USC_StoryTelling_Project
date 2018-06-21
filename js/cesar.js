
// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  Plotly.d3.event.preventDefault();

  // Select the input value from the form
  var stock = Plotly.d3.select("#stateInput").node().value;
  console.log();

  // clear the input value
  Plotly.d3.select("#stateInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(state);
}

function buildPlot(state) {
  
  Plotly.d3.json('/sourcedata/overall_gun_deaths_by_year.json', function(error, response) {

    if (error) return console.warn(error);
	
	dict = {}

	response.forEach( function(res) {
		
	 if(!dict[res["st"]]){
		 dict[res["st"]] = {}
	 }
	 
	 dict[res["st"]][ res["Year(Date)"] ] = res;

	});
	
    // Grab values from the response json object to build the plots
    var deaths1 = dict[state][2014];
    var deaths2 = dict[state][2015];
    var deaths3 = dict[state][2016];
    

    var trace1 = {
      type: "bar",
      name: name,
      x: deaths1,
      y: [2014],
      line: {
        color: "#17BECF"
      }
    };
    var trace2 = {
      type: "bar",
      name: name,
      x: deaths2,
      y: [2015],
      line: {
        color: "#17BECF"
      }
    };
    var trace3 = {
      type: "bar",
      x: deaths3,
      y: [2016],
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1, trace2, trace3];

    var layout = {
      title: 'Deaths Per State by Year',
      xaxis: {
        autorange: true,
        type: "linear"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
}

// Add event listener for submit button
Plotly.d3.select("#submit").on("click", handleSubmit);
