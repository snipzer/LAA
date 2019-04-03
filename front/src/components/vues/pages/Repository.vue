<template>
    <div class="row">
        <div class="col">
            <h1>Ici les répositories les plus contribuer par les membres de l'organisation</h1>
            <div class="row">
                <div class="col">
                    <div v-for="information in informations">
                        <div class="card" style="width: 100%;">
                            <div class="card-body">
                                <h5 class="card-title">{{ information.reponame }}</h5>
                                <p class="card-text">{{information.stargazer}} <i class="em em-star" style="font-size:15px"></i></p>
                                <p class="card-text"><template v-for="user in information.users">{{user}} </template></p>
                                <a :href="information.url" class="card-link">Acceder au repository !</a>
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
                informations: null,
            }
        },
        created() {
            this.getDataFromApi()
        },
        methods: {
            async getDataFromApi() {
                let response = await Vue.services.github.getRepositories()
                this.informations = response.body;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
