<template>
    <div class="row" id="menu-top">
        <div class="col">
            <h1>{{getAppName()}}</h1>
        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div v-if="userLogin !== null && userLogin.length > 0">
                        <p>{{userLogin}}</p>
                    </div>
                    <div v-else>
                        <p>Vous n'êtes pas connecter</p>
                    </div>
                </div>
                <div class="col" style="text-align: right">
                    <Logout></Logout>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import packageInfo from "../../../../package.json";
    import Logout from "../pages/Logout.vue";

    export default {
        name: "Header",
        data: function () {
            return {
                userLogin: '',
            }
        },
        created() {
            this.userLogin = Vue.localStorage.get("userLogin");
            this.$bus.$on("authenticated", (isAuthenticated) => {
                if(isAuthenticated) {
                    this.userLogin = Vue.localStorage.get("userLogin");
                } else {
                    this.userLogin = "Vous n'êtes pas connecter."
                }
            });
        },
        methods: {
            getAppName() {
                return packageInfo.name.replace(/_/g, " ").toUpperCase();
            }
        },
        components: {
            Logout
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
