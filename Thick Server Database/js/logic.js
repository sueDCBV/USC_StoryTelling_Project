d3.json("sourcedata/Cause_of_Gun_Deaths_by_City_State_Year2017ca.json", function(response)
{
  createMarkers(response)
});

function createMarkers(response) {

  var locations = response.data.locations;

  var crimeMarkers = [];

  // loop through the location array
  for (var index = 0; index < locations.length; index++) {
    var location = locations[index];

    // for each station, create a marker and bind a popup with the location's deaths
    var crimeMarker = L.marker([location.lat, location.lon])
      .bindPopup("<h3>" + location.Number_of_Deaths + "<h3><h3>city: " + location.city_or_county + "<h3>");

    // add the marker to the crimeMarkers array
    crimeMarkers.push(crimeMarker);
  }

  // create a layer group made from the bike markers array, pass it into the createMap function

  
  var crimeLocations = L.layerGroup(crimeMarkers);
  //geojson.addTo(allYears_layer);
   

  createMap(crimeLocations);
}

function createMap(crimeLocations) {

  // create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid3l5MDkyMCIsImEiOiJjamh4bzB0bnQwZHFpM3dxbjNkcndwMHY1In0.v4VaXTlGgpzEXgwXlxYatQ", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18
  });

  // create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // create an overlayMaps object to hold the crime location layer
  var overlayMaps = {
    "Crime Locations": crimeLocations
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [41.8781, -87.6298],
    zoom: 12,
    layers: [lightmap, crimeLocations]
  });

  // create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}