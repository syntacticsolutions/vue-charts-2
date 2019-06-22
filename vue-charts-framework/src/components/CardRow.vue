<template>
    <div class="content-row">
        <div
            class="cardstyle card"
            v-for="(card, idx) in contents.list"
            :key="idx">
            <div v-if="card.type !== 'filter'" class="card-label">{{ card.label }}</div>
            <div v-if="card.type !== 'filter'" class="card-info">{{ card.value | ifEmpty }}</div>
            <div
                class="card-filter"
                v-if="card.type === 'filter'"
                ref="cardFilters">
                <div
                    class="filter-card"
                    v-for="(filter, idx) in card.values"
                    :key="idx"
                    :style="'color:' + filter.color + ';'">
                    <input @change="filterBy(filter.label, card.ref_column)" type="checkbox" :id="filter.label" :name="card.ref_column"/><label :for="filter.label" :value="filter.label">{{ filter.label.normalize() + ' : ' + filter.value }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['contents', 'dashData']
}
</script>
