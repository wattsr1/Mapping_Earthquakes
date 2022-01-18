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
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layer
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Accessing the airport GeoJSON URL
let torontoHoods ="https://raw.githubusercontent.com/wattsr1/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function 
// to calculate the radius
function styleInfo(feature) {
  return {
    opacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// This function determines the radius of the earthquake marker based on its magnitude
// Earthquakes with a magnitude of 0 will be ploted with a radius of 1
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}
//Grabbing our GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using styleInfo function
    style: styleInfo
  }).addTo(map);
});


