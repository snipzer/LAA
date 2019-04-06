<template>
    <div class="row" id="body">
        <div class="col">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BodyPage",
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #body {
     padding-top: 2%;
     padding-bottom: 5%;
     height: 650px;
     overflow-y: scroll;
 }
</style>
