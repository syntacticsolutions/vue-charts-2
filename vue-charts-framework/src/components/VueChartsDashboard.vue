<template>
    <div class="vue-charts-dashboard">
		<section class="component-container"
			v-for="(section, idx) in configJSON"
			:key="idx">
			<component
				:is="section.type"
				:contents="section"
				:dashData="dataArray[idx]"
                @fullscreen="toggleFullscreen"
                @exportCSV="exportCSV"
				:aggregation="section.aggType || undefined"
			/>
		</section>
    </div>
</template>

<script>
import fscreen from 'fscreen'
import CardRow from './CardRow'
import Title from './Title'
import LineChart from './LineChart'
import BarChart from './BarChart'
import PieChart from './PieChart'
import GlobalMap from './GlobalMap'
import USMap from './USMap'
import LeaderBoard from './LeaderBoard'

export default {
	components: {
		CardRow,
		Title,
		LineChart,
		BarChart,
		PieChart,
		GlobalMap,
		USMap,
		LeaderBoard
	},
	props: {
		dataArray: {
			type: Array,
			required: true
		},
		configJSON: {
			type: Array,
			required: true
		},
		search: {
			type: String,
			required: false,
			default: ''
		}
	},
	data: () => ({
		fullscreen: false,
		currentMultiAggType: ''
	}),
	methods: {
        toggleFullscreen (ev) {
            if (this.fullscreen) {
                this.fullscreen = false
                fscreen.exitFullscreen()
            } else {
                this.fullscreen = true
                fscreen.requestFullscreen(this.$el)
            }
		},
		exportCSV () {
            let header = Object.keys(this.dashData[0])
            let csv = (`"${header.join('","')}"\n`)
                .concat(
                    // traverse each row
                    this.dashData.map(
                        row =>
							`"${header.map(
									key => row[key] ? row[key] : ' '
							).join('","')} "`
                    )
                    .join('\n')
                )
            let csvData = new Blob([csv], { type: 'text/csv' })
            let csvUrl = window.URL.createObjectURL(csvData)
            let link = document.createElement('a')
            link.href = csvUrl
            link.download = 'export.csv'
            link.click()
        }
	}
}
</script>
