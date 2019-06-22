<template>
    <section class="title">
        <svg class="back" height="30px" width="40px" fill="#888" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 748 519.74"><title>arrow</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M31.5,290.87a31,31,0,0,1,0-62h685a31,31,0,0,1,0,62Z"/><path d="M716.5,229.37a30.5,30.5,0,0,1,0,61H31.5a30.5,30.5,0,0,1,0-61h685m0-1H31.5a31.5,31.5,0,0,0,0,63h685a31.5,31.5,0,0,0,0-63Z"/><path d="M35.63,285.24a31,31,0,0,1-21.92-52.92L236.45,9.58a31,31,0,1,1,43.84,43.84L57.55,276.16A30.81,30.81,0,0,1,35.63,285.24Z"/><path d="M258.37,1a30.5,30.5,0,0,1,21.57,52.07L57.2,275.81a30.5,30.5,0,0,1-43.14-43.14L236.8,9.93A30.3,30.3,0,0,1,258.37,1m0-1A31.4,31.4,0,0,0,236.1,9.23L13.36,232a31.51,31.51,0,0,0,0,44.55h0a31.48,31.48,0,0,0,44.54,0L280.64,53.77a31.49,31.49,0,0,0,0-44.54h0A31.4,31.4,0,0,0,258.37,0Z"/><path d="M258.37,519.24a30.81,30.81,0,0,1-21.92-9.08L13.71,287.42a31,31,0,1,1,43.84-43.84L280.29,466.32a31,31,0,0,1-21.92,52.92Z"/><path d="M35.63,235a30.3,30.3,0,0,1,21.57,8.93L279.94,466.67a30.5,30.5,0,0,1-43.14,43.14L14.06,287.07A30.5,30.5,0,0,1,35.63,235m0-1a31.4,31.4,0,0,0-22.27,9.23h0a31.49,31.49,0,0,0,0,44.54L236.1,510.51a31.48,31.48,0,0,0,44.54,0h0a31.51,31.51,0,0,0,0-44.55L57.9,243.23A31.4,31.4,0,0,0,35.63,234Z"/></g></g></svg>
        <div class="title-container">
            <div class="right-container">
                <span class="updated-text">Last Updated: {{ contents.updated }}</span>
                <svg class="octicon-gear" viewBox="0 0 14 16" version="1.1" width="30px" height="30px" aria-hidden="true"><path fill-rule="evenodd" d="M14 8.77v-1.6l-1.94-.64-.45-1.09.88-1.84-1.13-1.13-1.81.91-1.09-.45-.69-1.92h-1.6l-.63 1.94-1.11.45-1.84-.88-1.13 1.13.91 1.81-.45 1.09L0 7.23v1.59l1.94.64.45 1.09-.88 1.84 1.13 1.13 1.81-.91 1.09.45.69 1.92h1.59l.63-1.94 1.11-.45 1.84.88 1.13-1.13-.92-1.81.47-1.09L14 8.75v.02zM7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></svg>
            </div>
            <div class="left-container">
                <h1 class="title-text">{{ contents.title }}</h1>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['contents', 'isFullScreen']
}
</script>

<style lang="scss" scoped>

@import '../assets/scss/variables.scss';

.title {
    color: #222;
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .back {

    }

    .title-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        justify-content: space-between;
        width: 95%;
    }

    svg {
        cursor: pointer;
    }

    .left-container,
    .right-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .left-container {
        justify-content: flex-start;
        flex-grow: 2;
    }

    .right-container {
        justify-content: flex-end;
    }

    .title-text {
        margin-left: 20px;
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        font-weight: 400;
        min-width: 300px;
    }

    .octicon-gear {
        fill: $primary;
    }

    .updated-text {
        margin-right: 20px;
        min-width: 200px;
    }
}

</style>
