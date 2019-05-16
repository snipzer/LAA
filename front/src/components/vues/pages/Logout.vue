<template>
    <button class="btn btn-info" v-on:click="logout()"><img src="../assets/logout.png" alt="logout" width="15" height="15"></button>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "Logout",
        methods: {
            logout: function () {
                Vue.services.user.logout(Vue.localStorage.get("userToken")).then(() => {
                    Vue.localStorage.set("userLogin", "");
                    Vue.localStorage.set("userOrganization", "");
                    Vue.localStorage.set("userId", "");
                    Vue.localStorage.set("userToken", "");
                    this.$bus.$emit('authenticated', false);
                    this.$router.push("login");
                }).catch(err => console.log(err));
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
