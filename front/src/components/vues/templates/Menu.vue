<template>
    <div class="row" id="menu">
        <div class="col">
            <Header></Header>
            <div v-if="isLogged">
                <div class="row menu-bot">
                    <div class="col">
                        <router-link class="btn btn-primary menu-card" role="button" to="/update">Mon compte</router-link>
                    </div>
                    <div class="col">
                        <router-link class="btn btn-primary menu-card" role="button" to="/repository">Mes repositories</router-link>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="row menu-bot">
                    <div class="col">
                        <router-link class="btn btn-primary menu-card" role="button" to="/login">Me connecter</router-link>
                    </div>
                    <div class="col">
                        <router-link class="btn btn-primary menu-card" role="button" to="/register">M'enregistrer</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // TODO Fix le comportement pour le login logout
    import Vue from "vue";
    import Header from "./Header.vue";
    export default {
        name: "MenuPage",
        data: () => {
            return {
                isLogged: false,
            }
        },
        async created() {
            const token = Vue.localStorage.get("userToken");
            Vue.services.user.checkUserToken(token)
                .then(() => {
                    this.isLogged = true;
                })
                .catch(() => {
                    this.isLogged = false;
                });
        },
        components: {
            Header
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #menu {
        background-color: white;
        padding: 0px;
        border-bottom: 10px solid lightblue;
        border-radius: 35px;
    }

    .menu-bot {
        margin-top: 2%;
        margin-bottom: 2%;
    }

    .menu-card {
        cursor: pointer;
        width: 100%;
        height: 100%;
        color: #FFFFFF;
    }
</style>
