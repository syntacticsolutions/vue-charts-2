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
import CardRow from './CardRow.vue'


export default {
	components: {
		CardRow,
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
        }
	}
}
</script>
