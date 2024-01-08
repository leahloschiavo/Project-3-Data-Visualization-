// Initialize the map
let myMap = L.map("map", {
    center: [32.6225, -7.9898],
    zoom: 3
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// State code to state name list
let stateCodeToName = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
    "CO": "Colorado", "CT": "Connecticut", "DC": "District of Columbia", "DE": "Delaware", "FL": "Florida", "GA": "Georgia",
    "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
    "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MP": "Northern Mariana Islands",
    "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey",
    "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio",
    "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "PR": "Puerto Rico", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
    "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
  };

// Coordinates for map markers
let stateCoordinates = {
    "AL": [32.806671, -86.79113], "AK": [61.016999, -149.269608], "AZ": [33.729759, -111.431221], "AR": [34.969704, -92.373123],
    "CA": [36.116203, -119.681564], "CO": [39.059811, -105.311104], "CT": [41.597782, -72.755371], "DE": [39.318523, -75.507141],
    "DC": [38.9072, -77.0369],  "FL": [27.994402, -81.760254], "GA": [33.040619, -83.643074], "HI": [21.094318, -157.498337],
    "ID": [44.240459, -114.478828], "IL": [40.349457, -88.986137], "IN": [39.849426, -86.258278], "IA": [42.011539, -93.210526], 
    "KS": [38.5266, -96.726486], "KY": [37.66814, -84.670067], "LA": [31.169546, -91.867805], "ME": [44.693947, -69.381927],
    "MD": [39.063946, -76.802101], "MA": [42.230171, -71.530106], "MI": [43.326618, -84.536095],  "MP": [15.0979, 145.6739],
    "MN": [45.694454, -93.900192], "MS": [32.741646, -89.678696], "MO": [38.456085, -92.288368], "MT": [46.921925, -110.454353],
    "NE": [41.12537, -98.268082], "NV": [38.313515, -117.055374], "NH": [43.452492, -71.563896], "NJ": [40.298904, -74.521011],
    "NM": [34.840515, -106.248482], "NY": [42.165726, -74.948051], "NC": [35.630066, -79.806419], "ND": [47.528912, -99.784012],
    "OH": [40.388783, -82.764915], "OK": [35.565342, -96.928917], "OR": [44.572021, -122.070938], "PA": [40.590752, -77.209755], 
    "PR": [18.200178, -66.664513], "RI": [41.680893, -71.51178], "SC": [33.856892, -80.945007], "SD": [44.299782, -99.438828],
    "TN": [35.747845, -86.692345], "TX": [31.054487, -97.563461], "UT": [40.150032, -111.862434], "VT": [44.045876, -72.710686],
    "VA": [37.769337, -78.169968], "WA": [47.400902, -121.490494], "WV": [38.491226, -80.954071], "WI": [44.268543, -89.616508], 
    "WY": [42.755966, -107.30249]
  };
      

// Fetch COVID-19 data from the API
fetch('https://api.covidactnow.org/v2/states.json?apiKey=7fb409a8a26b4411ae23ae0442f857d2')
    .then(response => response.json())
    .then(data => {
        // Process the data and add markers to the map
        data.forEach(state => {
            // Extract relevant information
            let stateCode = state.state;
            let stateName = stateCodeToName[stateCode];
            let population = state.population.toLocaleString();
            let cases = state.actuals.cases.toLocaleString();
            let casePercentage = ((state.actuals.cases / state.population) * 100).toLocaleString();
            let deaths = state.actuals.deaths.toLocaleString();
            let deathPercentage = ((state.actuals.deaths / state.population) * 100).toLocaleString();



            // Create a marker with a popup
            let marker = L.marker(stateCoordinates[stateCode])
                .bindPopup(
                    `<strong>${stateName}</strong><br>` +
                    `Population: ${population}<br>` +
                    `Cases: ${cases}<br>` +
                    `Percentage of Cases: ${casePercentage}%<br>` +
                    `Deaths: ${deaths}<br>` +
                    `Percentage of Deaths: ${deathPercentage}%`
                )
                .addTo(myMap);
        });
    });


