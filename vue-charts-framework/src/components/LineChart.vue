<script>
// import utils from '../mixins/utils.vue'
import charts from '../mixins/chart.vue'
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/legend')
require('echarts/lib/component/visualMap')
// var _ = {
//     extend: require('lodash/extend')
// }
export default {
    mixins: [charts],
    data: () => ({
        yTrends: [],
        initialAggType: '',
        isFullScreen: false,
        isBarGraph: false,
        areaStyle: null,
        tooltip: {
            show: true,
            trigger: 'axis'
        }
    }),
    watch: {
        isBarGraph (val) {
            this.contextMenuOptions.forEach((obj) => {
                if (val) {
                    if (obj.href === '$switchBarLine') {
                        obj.label = 'View as Line Graph'
                        obj.icon = 'ios-pulse'
                    }
                } else {
                    if (obj.href === '$switchBarLine') {
                        obj.label = 'View as Bar Graph'
                        obj.icon = 'ios-stats'
                    }
                }
            })
        },
        currentAggType (val, oldVal) {
            this.switchAggType(val)
        }
    },
    methods: {
        generateConfig (data, updating) {
            this.checkForColorConfigs(updating)
            this.checkForMaxValue(data, updating)
            this.sortAndFilterDuplicates(data, updating)
            this.yTrends = this.contents.yIdentifier ? this.getSubColumnTrends() : this.getTrends(data)
            this.checkForCustomAggregationTooltip()
            let option = {
                tooltip: this.tooltip,
                legend: this.contents.origLegend ? {
                    data: this.contents.yVals,
                    itemWidth: 10,
                    width: this.contents.report ? 1000 : this.contents.origLegend ? '90%' : '100%',
                    bottom: this.contents.report ? 24 : this.contents.origLegend ? null : -7,
                    top: this.contents.origLegend ? '0%' : '5%',
                    left: '10%',
                    align: 'right',
                    type: 'scroll',
                    show: this.colors.length
                } : null,
                grid: {
                    left: this.contents.report ? '100' : '10%',
                    right: '5%',
                    bottom: this.contents.report ? 60 : '7%',
                    top: this.contents.report ? 60 : this.contents.origLegend ? '5%' : !this.colors[0] ? '3%' : '1.8%'
                },
                dataView: {
                    lang: ['en-US']
                },
                // dataZoom: [
                //     {
                //         show: !this.contents.report
                //     }
                // ],
                xAxis: {
                    type: 'category',
                    // name: this.contents.xVal,
                    // nameLocation: 'middle',
                    nameTextStyle: {
                    },
                    nameGap: this.contents.report ? 35 : 15,
                    data: this.xList,
                    stack: 'something',
                    boundaryGap: true,
                    splitLine: {
                        show: false,
                        interval: 'auto',
                        lineStyle: {
                            color: ['#D4DFF5']
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#609ee9'
                        }
                    },
                    axisLabel: {
                        show: true,
                        // margin: 10,
                        textStyle: {
                            fontSize: 12
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: this.contents.yVal,
                    offset: 0,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['rgba(0,100,255, 0.15)']
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#609ee9'
                        },
                        show: true,
                        margin: -40,
                        interval: 100
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 10
                        }
                    }
                },
                series: this.yTrends.map((arr, i) => ({
                    name: this.contents.yVals[i],
                    type: 'line',
                    smooth: true,
                    showSymbol: true,
                    areaStyle: this.areaStyle,
                    symbol: 'circle',
                    symbolSize: 5,
                    data: arr,
                    itemStyle: this.colors[i] ? {
                        normal: {
                            color: this.colors[i]
                        }
                    } : null,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }))
            }
            if (this.contents.aggView) {
                option.tooltip.formatter = this.aggViewFormatter
            }
            if (!this.colors.length) {
                option.visualMap = this.visualMap()
            }
            this.option = option
            // setTimeout(() => {
            //     this.chart.setOption(option)
            // }, 0)
        },
        switchBarLine (defalt) {
            if (defalt) {
                this.isBarGraph = true
            }
            if (!this.isBarGraph) {
                this.chart.setOption(
                    {
                        series: this.yTrends.map((arr, i) => ({
                            name: this.contents.yVals[i],
                            type: 'bar',
                            smooth: true,
                            showSymbol: true,
                            symbol: 'circle',
                            symbolSize: 5,
                            data: arr,
                            itemStyle: {
                                normal: {
                                    color: this.colors[i] || 'transparent'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 4
                                }
                            }
                    })) }
                )
                this.isBarGraph = true
            } else {
                this.chart.setOption(
                    {
                        series: this.yTrends.map((arr, i) => ({
                            name: this.contents.yVals[i],
                            type: 'line',
                            smooth: true,
                            showSymbol: true,
                            symbol: 'circle',
                            symbolSize: 7,
                            data: arr,
                            itemStyle: {
                                normal: {
                                    color: this.colors[i] || 'transparent'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 4
                                }
                            }
                    })) }
                )
                this.isBarGraph = false
            }
        }
    },
    mounted () {
        this.contextMenuOptions.push({
            label: 'View as Bar Graph',
            href: '$switchBarLine',
            icon: 'ios-stats'
        })
    }
}
</script>
