<template>
    <Loader></Loader>
</template>

<script>
    import Vue from "vue";
    import Loader from "../../layout/Loader.vue";

    export default {
        name: "Home",
        async created() {
            const token = Vue.localStorage.get("userToken");
            Vue.services.user.checkUserToken(token)
                .then(() => this.$router.push("repository"))
                .catch(() => this.$router.push('login'));
        },
        components: {
            Loader
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
