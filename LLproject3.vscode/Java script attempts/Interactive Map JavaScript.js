// Initialize Leaflet map
let myMap = L.map("map").setView([37.8, -96], 4);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Fetch COVID-19 data and political data
Promise.all([
  fetch('https://storage.googleapis.com/covid19-open-data/v3/oxford-government-response.json').then(response => response.json()),
  fetch('C:\Users\leahm\Downloads\election.csv').then(response => response.json()) 
])
  .then(([covidData, politicalData]) => {
    console.log(covidData);
    console.log(politicalData);

    

    // Create a GeoJSON layer for state boundaries
    let geojsonLayer = L.geoJSON(covidData, {
      style: feature => ({
        fillColor: getColor(feature.properties.stringency_index),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.8
      }),
      onEachFeature: (feature, layer) => {
        let popupContent = generatePopupContent(feature.properties, politicalData);
        layer.bindTooltip(popupContent, { sticky: true });

        // Add mouseover, mouseout, and click events
        layer.on({
          mouseover: function (e) {
            // Open a new window with political information on mouseover
            openPoliticalInfoWindow(feature.properties.name, politicalData);
            // ... other mouseover actions
          },
          // ... other events
        });
      }
    }).addTo(myMap);

    // Add legend to the map
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
      let div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 10, 15];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
    };

    legend.addTo(myMap);
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to determine color based on a value
function getColor(value) {
  return value > 15 ? '#800026' :
    value > 10 ? '#BD0026' :
      value > 5 ? '#E31A1C' :
        value > 0 ? '#FC4E2A' :
          '#FFEDA0';
}

// Function to generate Tooltip content based on feature properties and political data
function generatePopupContent(properties, politicalData) {
  let content = '<b>State Information:</b><br>';
  content += `Stringency Index: ${properties.stringency_index}<br>`;
  content += `School Closing: ${properties.school_closing}<br>`;
  content += `Workplace Closing: ${properties.workplace_closing}<br>`;
  // Add more properties as needed

  // Include political information if available
  const politicalInfo = politicalData.find(entry => entry.State === properties.name);
  if (politicalInfo) {
    content += `Political Affiliation: ${politicalInfo.Party}<br>`;
    // Add more political information as needed
  }

  return content;
}

// Function to open a new window with political information
function openPoliticalInfoWindow(stateName, politicalData) {
  const statePoliticalInfo = politicalData.find(entry => entry.State === stateName);

  if (statePoliticalInfo) {
    const politicalWindow = window.open('', '_blank');
    politicalWindow.document.write(`<h2>${stateName}</h2>`);
    politicalWindow.document.write(`<p>Political Affiliation: ${statePoliticalInfo.Party}</p>`);
    // Add more information as needed...
  } else {
    alert('Political information not available for ' + stateName);
  }
}
