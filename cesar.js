 // Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  Plotly.d3.event.preventDefault();

  // Select the input value from the form
  var state = Plotly.d3.select("#stateInput").node().value;
  console.log(state);

  // clear the input value
  Plotly.d3.select("#stateInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(state);
}

function buildPlot(state) {
  
  Plotly.d3.json('overall_gun_deaths_by_year.json', function(error, response) {

    if (error) return console.warn(error);
	
	dict = {}

	response.forEach( function(res) {
		
	 if(!dict[res["st"]]){
		 dict[res["st"]] = {}
	 }
	 
	 dict[res["st"]][ res["Year(Date)"] ] = res["Gun_Deaths"];

	});
	
	console.log(dict)
	
    // Grab values from the response json object to build the plots
    var deaths1 = dict[state][2014];
    var deaths2 = dict[state][2015];
    var deaths3 = dict[state][2016];
    var years = [2014, 2015, 2016];
	
	console.log(deaths1)
	console.log(deaths2)
	console.log(deaths3)
	
    var trace1 = {
      type: "bar",
      x: ['2014', '2015', '2016'],
      y: [deaths1, deaths2, deaths3],
	  name: 'Number of Deaths',
	  width: .3,
	  opacity: .75,
    };
    var trace2 = {
      type: "line",
      x: ['2014', '2015', '2016'],
      y: [deaths1, deaths2, deaths3],
	  name: 'Trend in ' + state,
	  line: {
		dash: 'dashdot',
		width: 4
	  },
    };

    var data = [trace1, trace2];

    var layout = {
      xaxis: {
	      showline: true,
		  showgrid: false,
		  showticklabels: true,
		  linecolor: 'rgb(204,204,204)',
		  linewidth: 2,
		  autotick: false,
		  ticks: 'outside',
		  tickcolor: 'rgb(204,204,204)',
		  tickwidth: 2,
		  ticklen: 5,
		  tickfont: {
          family: 'Arial',
		  size: 12,
          color: 'rgb(82, 82, 82)'
	  }},
      yaxis: { title: "Number of Gun Related Deaths",
	  showgrid: true,
	  zeroline: false,
      showline: false,
      showticklabels: false},
	  
	    annotations: [
		{
		  xref: 'paper',
		  yref: 'paper',
		  x: 0.0,
		  y: 1.05,
		  xanchor: 'left',
		  yanchor: 'bottom',
		  text: 'Number of Deaths by Year in ' + state,
		  font:{
			family: 'Arial',
			size: 30,
			color: 'rgb(37,37,37)'
		  },
		  showarrow: false
		},
		{
		  xref: 'paper',
		  yref: 'paper',
		  x: 0.5,
		  y: -0.1,
		  xanchor: 'center',
		  yanchor: 'top',
		  text: 'Year',
		  showarrow: false,
		  font: {
			family: 'Arial',
			size: 12,
			color: 'rgb(150,150,150)'
		  }
		}
	  ]
 
    };

    Plotly.newPlot("plot", data, layout);

  });
}

// Add event listener for submit button
Plotly.d3.select("#submit").on("click", handleSubmit);
