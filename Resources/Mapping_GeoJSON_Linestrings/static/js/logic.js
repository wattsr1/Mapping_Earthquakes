// Add console.log to check to see if our code is working
console.log("working");

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
  Street: light,
  Dark: dark
};

// Create the map object with a center and zoom level.
let map = L.map("map", {
  center: [44, -80],
  zoom: 2,
  layers: [light]
})

// Pass our map layers into our layers control and add the layer
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
light.addTo(map);

// Accessing the airport GeoJSON URL
let torontoData ="https://raw.githubusercontent.com/wattsr1/Mapping_Earthquakes/main/torontoRoutes.json";

// create a style for the lines
let myStyle = {
  color: "#ffffa1",
  weight: 2
}
//Grabbing our GeoJSON data
d3.json(torontoData).then(function(data) {
  console.log(data);
  // Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>");
    }
  }).addTo(map);
});


