document.addEventListener("DOMContentLoaded", function () {
    const stateDropdown = document.getElementById("stateDropdown");
    const dataContainer = document.getElementById("dataContainer");

    // Change of state codes to state names
    const stateCodeToName = {
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

    // Fetch states and populate dropdown
    fetch("https://api.covidactnow.org/v2/states.json?apiKey=7fb409a8a26b4411ae23ae0442f857d2")
      .then(response => response.json())
      .then(data => {
        data.forEach(state => {
          let option = document.createElement("option");
          option.value = state.state;
          option.text = stateCodeToName[state.state];
          stateDropdown.appendChild(option);
        });

        // Fetch data for the default state
        let startingState = data[0].state;
        fetchDataForState(startingState);
        updateMap(startingState);
      });

    // Handle dropdown change
    stateDropdown.addEventListener("change", function () {
      let selectedState = this.value;
      fetchDataForState(selectedState);
      updateMap(selectedState);
    });

    

    // Event listener for dropdown change
    stateDropdown.addEventListener("change", function () {
      const selectedState = this.value;
      fetchDataForState(selectedState);
        });

  

    // Function to fetch and display COVID-19 data for a specific state
    function fetchDataForState(state) {
      fetch(`https://api.covidactnow.org/v2/state/${state}.json?apiKey=7fb409a8a26b4411ae23ae0442f857d2`)
        .then(response => response.json())
        .then(data => {
          displayData(data);
        });
    }

    // Function to display COVID-19 data
    function displayData(data) {
      let dataContainerContent = {
        "Total Population": data.population.toLocaleString(),
        "Total Positive Cases": data.actuals.cases.toLocaleString(),
        "Total Percentage of Population With Positive Cases": `${((data.actuals.cases / data.population) * 100).toLocaleString()}%`,
        "Total Death": data.actuals.deaths.toLocaleString(),
        "Total Percentage of Deaths": `${((data.actuals.deaths / data.population) * 100).toLocaleString()}%`
      };

      // Update the content of the dataContainer element
      dataContainer.innerHTML = "";

      // Create a new paragraph element for each key-value pair and append it to dataContainer
      for (const [key, value] of Object.entries(dataContainerContent)) {
        let paragraph = document.createElement("p");
        paragraph.textContent = `${key}: ${value}`;
        dataContainer.appendChild(paragraph);
      }
    }
  });


  