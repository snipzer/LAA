<template>
    <Loader></Loader>
</template>

<script>
    import Vue from "vue";
    import Loader from "../../layout/Loader.vue";

    export default {
        name: "Home",
        created: function () {
            const token = Vue.localStorage.get("userToken");
            Vue.services.user.checkUserToken(token, Vue.localStorage.get("userId")).then(() => {
                this.$bus.$emit('authenticated', true);
                this.$router.push("repository")
            }).catch(() => {
                this.$bus.$emit('authenticated', false);
                this.$router.push('login')
            });
        },
        components: {
            Loader
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
