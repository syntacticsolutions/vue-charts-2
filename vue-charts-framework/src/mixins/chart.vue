<template>
    <div>
        <!-- <custom-context-menu
            slot="menu"
            ref="contextMenu"
            :menuItems="contextMenuOptions"
            :title="contextMenuItem"
            :visible="showCustomContextMenu"
            :coords="contextMenuCoordinates"
            :row="contextMenuRow"
            @close="showCustomContextMenu = false"
            @hover="customContextMenuHovering = $event"
            @fullscreen="fullscreen($event)"
            @saveAsImage="saveAsImage($event)"
            @exportCSV="exportCSV($event)"
            @switchBarLine="switchBarLine($event)"/>
            <card-filters
            v-show="isFullScreen"
            v-if="contents.filters && contents.filters.length"
            :contents="contents"
			></card-filters> -->
            <div slot="chart" class="chart" ref="chart" :style="{ height: '100%' }"></div>
    </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
// import customContextMenu from '../components/CustomContextMenu'
// import CardFilters from '../components/CardFilters'
// import ChartContainer from '../components/ChartContainer'
// import Chart from '../components/Chart'
import MIcon from '../components/MIcon'
import 'echarts/lib/component/tooltip'
var _ = {
    filter: require('lodash/filter'),
    each: require('lodash/each')
}
export default {
    props: ['contents', 'dashData', 'height', 'width', 'currentAggType', 'align'],
    components: {
        MIcon // eslint-disable-line
    },
    watch: {
        option (val) {
            if (Object.keys(val).length) {
                setTimeout(() => {
                    this.chart.setOption(this.option)
                }, 0)
            }
        }
    },
    data: () => ({
        option: {},
        interval: '',
        externalData: [],
        menuTarget: undefined,
        xList: [],
        initialLoad: true,
        chart: null,
        originalExternalData: [],
        xMap: [],
        isFullScreen: false,
        totalArr: [],
        showCustomContextMenu: false,
        contextMenuCoordinates: {},
        contextMenuItem: '',
        yTrends: [],
        customContextMenuHovering: false,
        contextMenuRow: '',
        fullScreenIcon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 490 490' style='enable-background:new 0 0 490 490;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M181.837,293.967L20.761,455.041v-50.35c0-5.543-4.494-10.037-10.039-10.037c-5.543,0-10.038,4.494-10.038,10.037v74.582 v0.012v0.676c0,5.547,4.495,10.039,10.038,10.039h75.271c5.543,0,10.04-4.492,10.04-10.039c0-5.543-4.497-10.039-10.04-10.039 h-51.72l161.759-161.756c3.923-3.922,3.923-10.277,0-14.199C192.111,290.047,185.757,290.047,181.837,293.967z'/%3E%3Cpath d='M489.316,479.273v-74.582c0-5.543-4.493-10.037-10.038-10.037c-5.545,0-10.04,4.494-10.04,10.037v50.35L308.167,293.969 c-3.921-3.918-10.275-3.918-14.195,0c-3.923,3.924-3.923,10.279,0,14.199l161.755,161.754h-51.719 c-5.544,0-10.04,4.496-10.04,10.039c0,5.547,4.496,10.039,10.04,10.039h75.27c5.545,0,10.038-4.492,10.038-10.039v-0.676V479.273z '/%3E%3C/g%3E%3Cg%3E%3Cpath d='M181.837,196.033L20.761,34.963v50.346c0,5.545-4.494,10.037-10.039,10.037c-5.543,0-10.038-4.492-10.038-10.037v-74.58 v-0.01v-0.678C0.684,4.496,5.179,0,10.722,0h75.271c5.543,0,10.04,4.496,10.04,10.041c0,5.543-4.497,10.037-10.04,10.037h-51.72 l161.759,161.76c3.923,3.92,3.923,10.275,0,14.195C192.111,199.955,185.757,199.955,181.837,196.033z'/%3E%3Cpath d='M489.316,10.729v74.58c0,5.545-4.493,10.037-10.038,10.037c-5.545,0-10.04-4.492-10.04-10.037V34.963L308.167,196.029 c-3.921,3.924-10.275,3.924-14.195,0c-3.923-3.918-3.923-10.273,0-14.195L455.727,20.078h-51.719 c-5.544,0-10.04-4.494-10.04-10.037c0-5.545,4.496-10.041,10.04-10.041h75.27c5.545,0,10.038,4.496,10.038,10.041v0.678V10.729z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E",
        exitFullScreenIcon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 502.56 502.56' style='enable-background:new 0 0 502.56 502.56;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath d='M171.36,148.8L22.72,0L0,22.72l148.8,148.64H75.36v32h112c8.837,0,16-7.163,16-16v-112h-32V148.8z'/%3E%3Cpath d='M315.36,203.36h112v-32h-73.44L502.56,22.72L480,0L331.36,148.8V75.36h-32v112 C299.36,196.197,306.523,203.36,315.36,203.36z'/%3E%3Cpath d='M427.36,331.36v-32h-112c-8.837,0-16,7.163-16,16v112h32v-73.44L480,502.56L502.56,480L353.92,331.36H427.36z'/%3E%3Cpath d='M187.36,299.36h-112v32h73.44L0,480l22.56,22.56l148.8-148.64v73.44h32v-112 C203.36,306.523,196.197,299.36,187.36,299.36z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E",
        title: {
            left: '0%',
            show: true,
            padding: 20,
            // top: -12,
            // left: 16,
            textStyle: {
                color: 'rgba(77,149,204,.8)',
                fontSize: '24',
                fontWeight: '300',
                align: 'center'
            }
        },
        tooltip: {
            trigger: 'axis',
            show: true
        },
        maxVal: '',
        aggViewFormatter: params => {
            let total = params.reduce((accum, curr) => accum + parseInt(curr.value), 0)
            params.forEach((val, ind) => {
                val['percentage'] = (parseInt(val.value) / total * 100).toString()
                val.percentage = val.percentage.slice(0, val.percentage.indexOf('.') + 2) + '%'
            })
            let html = params.map(obj => {
                return `${obj.marker} ${obj.seriesName}: ${obj.value} - ${obj.percentage}`
            }).join('<br />')
            return params[0].axisValue + '<br />' + html
        },
        contextMenuOptions: [
            {
                label: 'Full Screen',
                href: '$fullscreen',
                icon: 'ios-expand'
            },
            {
                label: 'Save as Image',
                href: '$saveAsImage',
                icon: 'ios-image'
            },
            {
                label: 'Export CSV',
                href: '$exportCSV',
                icon: 'ios-paper'
            }
        ]
    }),
    computed: {
        computedData () {
            return this.originalExternalData
        }
    },
    methods: {
        fullscreen () {
            if (!this.isFullScreen) {
                this.fsContainer()
            } else {
                this.normalContainer()
            }
            this.defer(() => { this.showCustomContextMenu = false })
            this.chart.resize()
        },
        saveAsImage () {
            let a = document.createElement('a')
            a.href = this.chart.getDataURL({
                pixelRatio: 2,
                backgroundColor: '#fff'
            })
            a.download = this.fileIze(this.contents.title) + '.png'
            a.click()
        },
        defer (cb) {
            setTimeout(() => { cb() }, 0)
        },
        fsContainer () {
            let style = this.$el.parentNode.style
            this.isFullScreen = true
            style.height = '98vh'
            style.width = '97.5vw'
            style.margin = '0'
            this.$el.style.height = '95vh'
            this.$el.style.width = '95vw'
            style.position = 'fixed'
            style.top = '0'
            style.left = '0'
            style.zIndex = '30'
            this.contextMenuOptions[0].icon = 'ios-contract'
            this.contextMenuOptions[0].label = 'Exit Full Screen'
            this.showCustomContextMenu = false
        },
        normalContainer () {
            let style = this.$el.parentNode.style
            this.isFullScreen = false
            style.height = `${this.contents.height}`
            style.width = `${this.contents.width}`
            this.$el.style.height = `${this.contents.height}`
            style.position = 'relative'
            style.top = ''
            style.left = ''
            style.zIndex = '10'
            style.margin = '10px'
            this.contextMenuOptions[0].icon = 'ios-expand'
            this.contextMenuOptions[0].label = 'Full Screen'
            this.showCustomContextMenu = false
        },
        showOptionsMenu (ev) {
            if (!this.showCustomContextMenu) {
                ev.preventDefault()
                return this.showTableContextMenu(ev)
            } else {
                this.hideCustomContextMenu()
            }
        },
        hideCustomContextMenu () {
            if (!this.customContextMenuHovering) {
                this.showCustomContextMenu = false
                document.removeEventListener('mousedown', this.hideCustomContextMenu)
            }
        },
        showTableContextMenu (ev) {
            this.showCustomContextMenu = true
            setTimeout(() => {
                let menuWidth = this.$refs.contextMenu.$el.clientWidth
                let left = this.menuTarget.offsetLeft
                let top = this.menuTarget.offsetTop
                this.contextMenuCoordinates = { left: left - menuWidth + 23, top: top - 10 }
                // this.contextMenuRow = row
                document.addEventListener('mousedown', this.hideCustomContextMenu)
            }, 0)
        },
        visualMap () {
            return {
                show: true,
                top: '0%',
                left: '10%',
                align: 'auto',
                orient: 'horizontal',
                pieces: [{
                    gte: this.maxVal * (4 / 5),
                    color: '#2DD42D'
                }, {
                    gte: this.maxVal * (3 / 5),
                    lt: this.maxVal * (4 / 5),
                    color: '#4C98C1'
                }, {
                    gte: this.maxVal * (2 / 5),
                    lt: this.maxVal * (3 / 5),
                    color: '#ffde33'
                }, {
                    gte: this.maxVal * (1 / 5),
                    lt: this.maxVal * (2 / 5),
                    color: '#ff9933'
                }, {
                    gte: 0,
                    lt: this.maxVal * (1 / 5),
                    color: '#cc0033'
                }],
                outOfRange: {
                    color: 'rgba(0,0,0,0.1)'
                }
            }
        },
        resizeCharts () {
            if (!this.contents.report) {
                setTimeout(() => {
                    this.chart.resize()
                }, 200)
            }
        },
        dateDiffIsMultipleOf7 (date, orig) {
            let diff = Math.round((this.makeJSDate(date.split('-')) - this.makeJSDate(orig.split('-'))) / (1000 * 60 * 60 * 24))
            return diff === 0 || diff % 7 === 0
        },
        makeJSDate (dateParts) {
            return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2))
        },
        checkForColorConfigs (updating) {
            if (this.contents.yValColors && !updating) {
                // if the user has defined colors for the y-values override the default colors with them
                this.colors = this.contents.yValColors
            }
        },
        checkForMaxValue (data, updating) {
            if (this.contents.maxValue && !updating) {
                this.maxVal = data[0][this.contents.maxValue]
            }
        },
        switchAggType (aggType) {
            let data = this.dashData.length ? this.dashData : this.originalExternalData
            let [year, month, day] = data[0][this.contents.xVal].split('-') // eslint-disable-line no-unused-vars
            data = data.filter((val, idx) => {
                let [curYear, curMonth, curDay] = val[this.contents.xVal].split('-') // eslint-disable-line no-unused-vars
                switch (aggType) {
                    case 'Weekly': return this.dateDiffIsMultipleOf7(val[this.contents.xVal], data[0][this.contents.xVal])
                    case 'Monthly': return curDay === day
                    case 'Daily': return true
                    case 'Yearly': return month === curMonth
                }
            })
            this.switchBarLine(true)
            this.generateConfig(data, true)
        },
        sortAndFilterDuplicates (data, updating) {
            // find each instance of the user-defined x-value, remove duplicates, and sort
            this.xList = data.map(item => item[this.contents.xVal]).filter(this.getUnique).sort()
            // create a sorted map of the data for faster sorting
            this.xMap = data.map((el, i) => {
                    if (el !== null) return { i: i, value: el[this.contents.xVal] }
            }).sort((a, b) => {
                // sort descending
                if (a && b) {
                    return (a.value < b.value) ? -1 : (a.value > b.value) ? 1 : 0
                } else {
                    return 0
                }
            })
            // create the external data (not inherited from parent)
            if (!updating) {
                this.xMap.forEach(map => this.originalExternalData.push(data[map.i]))
                this.xMap.forEach(map => this.externalData.push(data[map.i]))
            } else {
                while (this.externalData.length > 0) {
                    this.externalData.pop()
                }
                this.xMap.forEach(map => this.externalData.push(data[map.i]))
            }
        },
        getSubColumnTrends () {
            if (typeof this.contents.yVals === 'string' && this.contents.yVals === 'dynamic') {
                this.contents.yVals = this.externalData.map(datum => datum[this.contents.yIdentifier]).filter(this.getUnique)
            }
            return this.contents.yVals.map(
                // go through each y-value
                val => this.externalData.filter(
                    // return all of the records that contain that sub-column value
                    el => el[this.contents.yIdentifier] === val
                    // make parallel arrays for the value to be graphed corresponding to each sub-column value
                ).map(el => el[this.contents.agg_id])
            )
        },
        getTrends (data) {
            var self = this
            if (!data[1]) {
                return [data[0][this.contents.xVal]]
            }
            if (data[0][this.contents.xVal] === data[1][this.contents.xVal]) {
                let multiArr = this.contents.yVals.map(y => [])
                let lastXVal
                return data.reduce((accum, iter, dataIndex) => {
                    let mdArr
                    if (!accum[0][0]) {
                        mdArr = _.filter(iter, (val, key) => self.contents.yVals.includes(key))
                    }
                    /*
                        If the xValues are not the same and records exist in accum
                    */
                    if (lastXVal !== iter[self.contents.xVal]) {
                        // return
                        _.each(self.contents.yVals, (yVal, ind) => {
                            accum[ind].push(iter[yVal])
                        })
                        mdArr = accum
                    }
                    if (lastXVal === iter[self.contents.xVal]) {
                        _.each(self.contents.yVals, (yVal, ind) => {
                            accum[ind][accum[ind].length - 1] += iter[yVal]
                        })
                        mdArr = accum
                    }
                    lastXVal = iter[self.contents.xVal]
                    return mdArr
                }, multiArr)
            }
            return this.contents.yVals.map(col => this.xMap.map(row => data[row.i][col]))
        },
        checkForCustomAggregationTooltip () {
            switch (this.contents.aggView) {
                // if the user has decided to show percent of total, make a parallel array showing the total for each index of each y value
                case 'percentOfTotal':
                    let len = this.yTrends[0].length - 1
                    // for each element in the yTrend parallel arrays
                    while (len--) {
                        // place the total of the aggregate x-indices of the n-dimensional array to the x-th index of the 'sum of total' array
                        this.totalArr.unshift(
                            this.yTrends.reduce((accum, curr) => {
                                return accum + parseInt(curr[len])
                            }, 0)
                        )
                    }
                    break
            }
        },
        fileIze (str) {
            return str
                .toLowerCase()
                .split(' ')
                .join('_')
        },
        exportCSV () {
            let data = this.dashData.length ? this.dashData : this.externalData
            let header = Object.keys(data[0])
            let csv = ('"' + header.join('","') + '"\n')
                .concat(
                    // traverse each row
                    data.map(
                        row =>
                                '"' + header.map(
                                key => row[key] ? row[key] : ' '
                            )
                            .join('","') + '"'
                    )
                    .join('\n')
                )
            // console.log(csv)
            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv
            }
            let encodedCSV = encodeURI(csv)
            let link = document.createElement('a')
            link.setAttribute('href', encodedCSV)
            link.setAttribute('download', 'export.csv')
            link.click()
        },
        checkForFilters () {
            if (this.contents.filters) {
                console.log(this.contents.filters)
            }
        }
    },
    mounted () {
        this.chart = echarts.init(this.$refs.chart)
        window.addEventListener('resize', this.resizeCharts, { passive: false })
        if (this.contents.aggType) {
            this.initialAggType = this.contents.aggType
        }
    }
}
</script>

<style lang="scss">
.indicator-icon {
    display: flex;
    justify-content: center;
    align-items: center;
}
.plus-or-minus {
    font-size: 12px;
    margin-left: 2px;
    display: flex;
    align-items: center;
    margin-right: 2px;
    color: #26855B;
}
.stats-container {
    margin-left: 22px;
    position: relative;
    z-index: 0;
    display: flex;
    flex-wrap: wrap;
    height: auto;
    width: 100%;
    .stats-text {
        font-size: 12px;
        display: flex;
        margin-left: 2px;
        height: 100%;
        padding-right: 5px;
        align-items: center;
        // position: absolute;
        color: rgba(0,0,0,0.5);
        justify-content: center;
        .stat {
            font-size: 14px;
            font-weight: 300;
            width: auto;
            // color: rgba(0,0,0,0.8);
            // margin-left: 10px;
            margin-right: 2px;
            &.negative {
                color: rgba(230, 0, 0 ,0.6)!important;
            }
            &.positive {
                color: #26855B!important;
            }
        }
    }
    .ion-ios-play {
        font-size: 22px;
    }
    .ion-ios-play.positive:before {
        // text-shadow: -1px 0 rgba(0,255,0, 0.8), 0 1px rgba(0,255,0, 0.8), 1px 0 rgba(0,255,0, 0.8);
        transform: rotate(-90deg);
        // color: rgba(0,255,0, 0.8);
    }
    .ion-ios-play.negative:before {
        transform: rotate(90deg);
        // text-shadow: -1px 0 rgba(230, 0, 0 ,0.8), 0 1px rgba(230, 0, 0 ,0.8), 1px 0 rgba(230, 0, 0 ,0.8), 0 -1px rgba(0,255,0, 0.8);
        // color: rgba(230, 0, 0 ,0.8);
    }
}
.chart-title {
    font-weight: 300;
    align-items: center;
    z-index: 0;
    overflow: visible;
    display:flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: column;
    .chart-title-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .chart-actions {
        // margin-right: 10px;
        font-size: 24px;
        cursor: pointer;
        .ct-menu-text {
            font-size: 17px;
        }
    }
}
.chart {
    width: 100%;
    // height: 100%;
}
.chart-container {
    display: grid;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    grid-gap: 5px;
    // grid-template-rows: 3ch auto minmax(15px, 100%);
    // grid-template-rows: fit-content(40%);
    grid-template-columns: 1fr;
    grid-template-rows: fit-content(10%);
    background: white;
    border-radius: 5px;
}
