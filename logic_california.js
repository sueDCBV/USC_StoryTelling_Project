// Mapbox API
//var mapbox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VlZGNidiIsImEiOiJjamkyZzR3YTYxMDkyM2tsa2VhZ2ZmMmM2In0.aeeG9yD9dcaJowPLQCZqSg";

var mapbox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
     "access_token=pk.eyJ1Ijoic3VlZGNidiIsImEiOiJjamkyZzR3YTYxMDkyM2tsa2VhZ2ZmMmM2In0." +
     "aeeG9yD9dcaJowPLQCZqSg";

var gunDataCali = "sourcedata/Cause_of_Gun_Deaths_by_City_State_Year2017ca.json"  

// Creating map object
var myMap = L.map("map", {
  center: [36.7378, -119.7871],
  zoom: 6
});

// Adding tile layer to the map
L.tileLayer(mapbox).addTo(myMap);

// Building API query URL
// var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// var date = "$where=created_date between'2016-01-10T12:00:00' and '2017-01-01T14:00:00'";
// var complaint = "&complaint_type=Rodent";
// var limit = "&$limit=10000";

// // Assembling API query URL
// var url = baseURL + date + complaint + limit;

// Grabbing the data with d3..
d3.json(gunDataCali, function(response) {

  // Creating a new marker cluster group
  var markers = L.markerClusterGroup();
  var locations = response;//.data.locations;

  // Loop through our data...
  for (var i = 0; i < locations.length; i++) {
    // set the data location property to a variable
    var location = locations[i];
    

    // If the data has a location property...
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([location.lat, location.lon]).bindPopup("<strong>"+location.Cause_of_Death+"</strong>"+
                                                                    "<br> &#10013: "+ location.Number_of_Deaths));

    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
