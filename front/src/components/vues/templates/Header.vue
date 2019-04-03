<template>
    <div class="row" id="menu-top">
        <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
        <div class="col">
            <h1>GITHUB API FETCHER</h1>
        </div>
        <div class="col">
            <p>Connecté en tant que : {{userLogin}}</p>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        name: "Header",
        data: function () {
            return {
                userLogin: Vue.localStorage.get("userLogin")
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #menu-top {
        background: lightblue top left no-repeat;
        padding-left: 20px;
        color: white;
        font-weight: bold;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 5px;
    }
</style>
