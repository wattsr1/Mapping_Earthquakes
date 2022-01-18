// Add console.log to check to see if our code is working
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
  "Street": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map("map", {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layer
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Accessing the airport GeoJSON URL
let torontoHoods ="https://raw.githubusercontent.com/wattsr1/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// create a style for the lines
let myStyle = {
  color: "#2e64fe",
  weight: 2,
  fillColor: "#ffff1a"
}
//Grabbing our GeoJSON data
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  // Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
    }
  }).addTo(map);
});


