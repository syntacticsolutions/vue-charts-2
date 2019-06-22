<template>
  <div id="app">
    <VueChartsDashboard :configJSON="configJSON" :dataArray="testDataArray" />
  </div>
</template>

<script>
import VueChartsDashboard from '../vue-charts-framework/src/components/VueChartsDashboard'

export default {
  components: {
    VueChartsDashboard
  },
  data: () => ({
    testDataArray: [],
    configJSON: [{
        type: 'Title',
        title: 'Simpsons Metrics',
        updated: date,
        parent: false,
        description: {
            title: 'Data Definitions',
            'Endpoints Purchased': 'Number of seats purchased (Source: Keystone)',
            'Endpoints Deployed': 'Number of endpoints actively installed (Source: Nebula)',
            'Deployment %': 'Endpoints Deployed / Endpoints Purchased',
            'Risk Category': 'Grouped category names based on the calculated risk'
        },
        // filters: [{
        //     type: 'agg',
        //     multiFilterXVal: { placeholder: 'Aggregation', type: 'date_agg', val: 'Snapshot Date', aggTypes: ['Monthly', 'Daily', 'Weekly'], default: 'Daily' }
        // }]
    }]
  })
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
