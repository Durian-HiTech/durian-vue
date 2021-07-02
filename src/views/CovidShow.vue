<template>
    <iframe :src="ruta" width="80%" height=800px></iframe>
</template>
<script>
export default {
    data: () => ({
        ruta: 'https://covid19.health/'
    })
}
</script>