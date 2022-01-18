// Add console.log to check to see if our code is working
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
  Street: streets,
  Dark: dark
};

// Create the map object with a center and zoom level.
let map = L.map("map", {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layer
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Accessing the airport GeoJSON URL
let airportData ="https://raw.githubusercontent.com/wattsr1/Mapping_Earthquakes/main/majorAirports.json";

//Grabbing our GeoJSON data
d3.json(airportData).then(function(data) {
  console.log(data);
  // Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      console.log(feature);
      return L.marker(latlng)
      .bindPopup("<h3>Airport code: " + feature.properties.faa + "</h3>" + "<hr>" + "<h3>Airport name: " + feature.properties.name + "</h3>");
    }

  }).addTo(map);
});


