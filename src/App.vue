<template>
  <div id="app">
    <VueChartsDashboard :configJSON="configJSON" :dataArray="testDataArray"/>
  </div>
</template>

<script>
import VueChartsDashboard from "../vue-charts-framework/src/components/VueChartsDashboard"

export default {
  components: {
    VueChartsDashboard
  },
  data: () => ({
	testDataArray: [],
	testDataEndpoints: [
		'api/dash_data/NOAA_global_climate_report',
		'api/dash_data/NOAA_global_climate_report',
		'api/dash_data/renewableEnergySlimmed',
		'api/dash_data/renewableEnergySlimmed',
		'api/dash_data/us_energy_consumption',
		'api/dash_data/super_heroes'
	],
    configJSON: [
      {
        type: "Title",
        title: "Simpsons Metrics",
        updated: new Date().toLocaleDateString("en-us"),
        parent: false,
        description: {
          title: "Data Definitions",
          "Endpoints Purchased": "Number of seats purchased (Source: Keystone)",
          "Endpoints Deployed":
            "Number of endpoints actively installed (Source: Nebula)",
          "Deployment %": "Endpoints Deployed / Endpoints Purchased",
          "Risk Category": "Grouped category names based on the calculated risk"
        }
        // filters: [{
        //     type: 'agg',
        //     multiFilterXVal: { placeholder: 'Aggregation', type: 'date_agg', val: 'Snapshot Date', aggTypes: ['Monthly', 'Daily', 'Weekly'], default: 'Daily' }
        // }]
      },
      {
        title: "Yearly Global Temperature Anomolies",
        height: "41vh",
        type: "LineChart",
        width: "400px",
        xVal: "Year",
        yValColors: ["lightgreen"],
        yVals: ["Anomaly"]
      },
      {
        title: "Yearly Average Global Temperature ",
        type: "LineChart",
        xVal: "Year",
        yVals: ["Average Temp Degrees Farhenheit"],
        width: "400px",
        height: "41vh",
        yValColors: ["#468992"]
      },
      {
        title: "Leading Renewable Energy Countries",
        type: "LeaderBoard",
        xVal: "Country Name",
        yVals: ["% Renewable Energy"],
        width: "400px",
        height: "41vh",
        yValColors: ["lightgreen"],
        goal: 75.0
      },
      // {
      //     type: 'line-chart',
      //     title: 'Yearly % Renewable Energy vs Best Economies',
      //     aggType: "daily",
      //     origLegend: true,
      //     xVal: 'Snapshot Date',
      //     agg_id: 'Accounts',
      //     aggView: 'Accounts',
      //     yVals: [''],
      //     width: '46%',
      //     height: '41vh',
      //     yValColors: ["#468992", "lightgreen",  "#DDE05D", "red", "#1C6C73", "orange"]
      // }
      {
        type: "GlobalMap",
        title: "Global Renewable Energy Consumption Map",
        colors: ["FF0000", "FFA500", "FFFF00", "008000"],
        maxValue: 100,
        label: "Country Code",
        valueColumn: "% Renewable Energy",
        width: "400px",
        height: "41vh"
      },
      {
        type: "USMap",
        title: "US Renewable Energy Consumption Map",
        yVal: "% Renewable Energy",
        xVal: "State",
        width: "400px",
        height: "41vh"
      },
      {
        title: "Most Popular Super Heroes by Movie Appearances",
        type: "PieChart",
        xVal: "Movie Appearances",
        yVal: "Name",
        width: "400px",
        height: "41vh"
      }
    ]
  }),
  mounted () {
	this.testDataEndpoints.map((endpoint, index) => {
		this.$axios.get(this.$config.host + endpoint)
		.then(res => {
			this.testDataArray[index] = res.data
		})
	})
  }
}
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
