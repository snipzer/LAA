<template>
    <div class="row">
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
</template>

<script>
    import Vue from "vue";

    export default {
        name: "Repository",
        data: () => {
            return {
                repositories: null,
            }
        },
        created() {
            console.log("toto")
            this.getRepositories()
        },
        methods: {
            async refreshRepositories() {
                try {
                    await Vue.services.github.refreshRepositories(Vue.localStorage.get("userToken"));
                } catch(err) {
                    if(err.status === 403) {
                        alert(err.body);
                        this.$router.push("login")
                    }
                }
            },
            async getRepositories() {
                try {
                    let response = await Vue.services.repository.getRepository(Vue.localStorage.get("userToken"));
                    this.repositories = response.body;
                } catch(err) {
                    if(err.status === 403) {
                        alert(err.body);
                        this.$router.push("login")
                    }
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
