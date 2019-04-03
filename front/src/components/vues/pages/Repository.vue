<template>
    <div class="row">
        <div class="col">
            <h1>Ici les répositories les plus contribuer par les membres de l'organisation</h1>
            <div class="row">
                <div class="col">
                    <div v-for="repository in repositories">
                        <div class="card" style="width: 100%;">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <a :href="repository.url" target="_blank" class="card-link">{{ repository.reponame }}</a>
                                </h5>
                                <p class="card-text">{{repository.stargazer}} étoile</p>
                                <p class="card-text"><template v-for="user in repository.users">{{user}} </template></p>
                            </div>
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
            this.getRepositories()
        },
        methods: {
            async getRepositories() {
                try {
                    let response = await Vue.services.github.getRepositories(Vue.localStorage.get("userToken"));
                    this.repositories = response.body;
                } catch(err) {
                    console.log(err);
                    // alert('Il semble y avoir eu un probleme')
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
