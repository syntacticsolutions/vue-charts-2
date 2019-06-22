<template>
  <i
    :class="`icon ion-${ name }`"
    @click="$emit('click', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)">
  </i>
</template>

<script>
export default {
    props: ['name']
}
</script>

<style>

</style>
