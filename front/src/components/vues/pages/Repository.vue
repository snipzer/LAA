<template>
    <div class="row" v-if="!loading">
        <div class="row width-100">
            <div class="col">
                <button class="btn btn-success" style="float: right" @click="refreshRepositories" >Refresh</button>
            </div>
        </div>
        <div class="row width-100">
            <div class="col">
                    <div v-for="repository in repositories">
                        <div class="card width-100" style="margin: 1%">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <a :href="repository.url" target="_blank" class="card-link">{{ repository.reponame }}</a>
                                </h5>
                                <p class="card-text">{{repository.stargazer}} étoile</p>
                                <p class="card-text">{{repository.users}}</p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <div v-else>
        <Loader></Loader>
    </div>
</template>

<script>
    import Vue from "vue";
    import Loader from "../../layout/Loader.vue";

    export default {
        name: "Repository",
        data: () => {
            return {
                loading: true,
                repositories: null,
            }
        },
        async created() {
            await this.getRepositories()
        },
        methods: {
            refreshRepositories: async function () {
                try {
                    this.loading = true;
                    this.repositories = null;
                    await Vue.services.github.refreshRepositories(Vue.localStorage.get("userToken"), Vue.localStorage.get("userId"));
                    await this.getRepositories();
                } catch(err) {
                    if(err.status === 403) {
                        alert(err.body);
                        this.$bus.$emit('authenticated', false);
                        this.$router.push("login")
                    }
                }
            },
            getRepositories: async function () {
                try {
                    this.loading = true;
                    let response = await Vue.services.repository.getRepository(Vue.localStorage.get("userToken"), Vue.localStorage.get("userId"));
                    if(response.body.length === 0) {
                        await this.refreshRepositories();
                    }
                    this.repositories = response.body;
                    this.loading = false;
                } catch(err) {
                    if(err.status === 403) {
                        alert(err.body);
                        this.$bus.$emit('authenticated', false);
                        this.$router.push("login")
                    }
                }
            }
        },
        components: {
            Loader
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
