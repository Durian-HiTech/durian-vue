<template>
    <div class="AirlineDetailRoot">
        <airline-map ref="AirlineMap">

        </airline-map>
    </div>
</template>

<script>
    import AirlineMap from "./charts/AirlineMap";
    export default {
        name: "AirlineDetail",
        components: {AirlineMap}
    }
</script>

<style scoped>

</style>