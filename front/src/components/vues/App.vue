<template>
    <div id="app">
        <div class="row">
            <div class="col">
                <MenuPage/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <BodyPage/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <FooterPage/>
            </div>
        </div>
    </div>
</template>

<script>
    import BodyPage from "./templates/Body.vue";
    import MenuPage from "./templates/Menu.vue";
    import FooterPage from "./templates/Footer.vue";

    export default {
        name: "app",
        components: {
            BodyPage,
            MenuPage,
            FooterPage
        }
    };
</script>

<style>
    #app {
        margin-left: 10%;
        margin-right: 10%;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 14px;
        line-height: 1.42857143;
        color: #333;
        background-color: #fff;
    }

    .width-100 {
        width: 100%;
    }
</style>
