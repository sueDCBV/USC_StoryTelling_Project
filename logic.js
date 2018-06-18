
// Store our API endpoint inside queryUrl
//var queryUrl = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
//  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

//  var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  
  var gunDataAllYears = "data/GunDataAllYears.geojson"  
  //var gunData2013 = "data/data_2013.json"
  //var gunData2014 = "data/data_2014.json"

  var geojson 

d3.json(gunDataAllYears, function(data) {
    
    geojson=L.geoJson(data, {style: style,onEachFeature: onEachFeature});
    createFeatures(geojson);
});

function style(feature) {
  return {
      fillColor: getColor(feature.properties.Total_Gun_Killed),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function getColor(d) {
  return d > 5000 ? '#800026' :
         d > 3000  ? '#BD0026' :
         d > 1000  ? '#E31A1C' :
         d > 500  ? '#FC4E2A' :
         d > 400   ? '#FD8D3C' :
         d > 300   ? '#FEB24C' :
         d > 200   ? '#FED976' :
                    '#FFEDA0';
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
  //info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
 // info.update();
}

function zoomToFeature(e) {
  myMap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
   //   click: zoomToFeature
  });

  layer.bindPopup("<strong>"+feature.properties.name + ", all killed: "  + feature.properties.Total_Gun_Killed+"</strong>"+
"<br> &#10013 2014: "+feature.properties.Gun_Killed_2014+
"<br> &#10013 2015: "+feature.properties.Gun_Killed_2015+
"<br> &#10013 2016: "+feature.properties.Gun_Killed_2016+
"<br> &#10013 2017: "+feature.properties.Gun_Killed_2017+
"<br> &#10013 2018(03): "+feature.properties.Gun_Killed_2018_03);
}

function createFeatures(geojson) {
  
   var allYears_layer = L.layerGroup();
   geojson.addTo(allYears_layer);
    
  // Sending our earthquakes layer to the createMap function
  createMap(allYears_layer);
};

function createMap(allYears_layer) {

  var statesmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
     "access_token=pk.eyJ1Ijoic3VlZGNidiIsImEiOiJjamkyZzR3YTYxMDkyM2tsa2VhZ2ZmMmM2In0." +
     "aeeG9yD9dcaJowPLQCZqSg");

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "States Map": statesmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    'Num of Killed by Gun incidents': allYears_layer
    //'2013': Year2013_layer
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.8, -96
    ],
    zoom: 4,
    layers: [statesmap, allYears_layer]
  });


  
var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) 
  {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 200,300,400, 500, 1000, 3000, 5000],
    labels = [];

    div.innerHTML +=
      '<strong>Num of Killed</strong><br>'; 
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) 
    {
      div.innerHTML +=
      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };

legend.addTo(myMap);

   // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false,
  position: 'topright'
  }).addTo(myMap);
  
 
}



