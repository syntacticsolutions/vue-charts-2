<script>
import chartMixin from '../mixins/chart'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
export default {
    mixins: [chartMixin],
    data: () => ({
        xAxisType: 'value',
        yAxisType: 'category',
        borderRadius: [0, 5, 5, 0],
        leaderboard: 1,
        yTrends: []
    }),
    methods: {
        getTrends (data) {
            let trends = [data.map(row => row[this.contents.yVals[0]]).reverse()]
            return trends
        },
        getMaxValue (data) {
            return data.reduce((accumulator, iterator) => {
                return accumulator > iterator ? accumulator : iterator
            })[0]
        },
        generateConfig (data, updating) {
            let self = this
            let k = this.contents.yVals[0]
            let topTen = data.sort((a, b) => a[k] < b[k] ? 1 : a[k] > b[k] ? -1 : 0).slice(0, 10)
            this.xList = topTen.map(el => el[this.contents.xVal]).reverse()
            // array reversed so that the biggest number is on top
            // so as not to confuse the data analyst when building their queries
            this.yTrends = this.getTrends(topTen)
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function (val) {
                        return self.xList[val.name || 0] + ': ' + val.value
                    }
                },
                grid: {
                    left: '1%',
                    right: '5%',
                    bottom: '2%',
                    top: '5%',
                    containLabel: true
                },
                // legend: {
                //     data: this.xList
                // },
                xAxis: {
                    type: 'value',
                    data: this.xList,
                    name: this.contents.yVals[0],
                    nameTextStyle: {
                        align: 'center'
                    },
                    nameGap: 30,
                    nameLocation: 'middle',
                    splitLine: {
                        show: !this.contents.report,
                        interval: 'auto',
                        lineStyle: {
                            color: ['#609ee9']
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        align: 'center'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#609ee9'
                        },
                        show: true
                    }
                },
                yAxis: {
                    type: 'category',
                    // name: this.contents.xVal,
                    axisTick: {
                        show: !this.contents.report
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#609ee9'
                        },
                        show: true
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['rgba(0,100,255, 0.15)']
                        }
                    },
                    axisLabel: {
                        show: false,
                        align: 'right'
                    }
                },
                series: this.yTrends.map((arr, i) => ({
                            type: 'bar',
                            data: arr,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: this.borderRadius,
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            { offset: 0, color: '#83bff6' },
                                            { offset: 0.5, color: '#188df0' },
                                            { offset: 1, color: '#188df0' }
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            { offset: 0, color: '#2378f7' },
                                            { offset: 0.7, color: '#2378f7' },
                                            { offset: 1, color: '#83bff6' }
                                        ]
                                    )
                                }
                            },
                            label: {
                                align: 'center',
                                normal: {
                                    show: true,
                                    position: this.leaderboard ? null : 'insideBottom',
                                    formatter: function (val) {
                                        return self.xList[val.name || 0]
                                    },
                                    textStyle: {
                                        fontSize: this.leaderboard ? '12' : this.contents.report ? '20' : '3',
                                        color: 'white'
                                    }
                                }
                            }
                        }))
                }
            this.chart.setOption(option)
        }
    }
}
</script>

<style lang="scss">
</style>
