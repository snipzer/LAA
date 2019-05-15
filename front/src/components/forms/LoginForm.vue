<template>
    <div class="row">
        <div class="col"></div>
        <div class="col">
            <div class="form-group">
                <InputText v-model="emailData.value" :placeholder="emailData.placeholder" :required="emailData.isRequired"></InputText>
                <InputPassword v-model="passwordData.value" :placeholder="passwordData.placeholder" :required="passwordData.isRequired"></InputPassword>
                <button class="btn btn-primary button-submit" v-on:click="submit()">Connexion !</button>
            </div>
        </div>
        <div class="col"></div>
    </div>
</template>

<script>
    import InputPassword from './inputs/InputPassword.vue';
    import InputText from './inputs/InputText.vue';
    import Vue from 'vue';

    export default {
        name: "LoginForm",
        components: {
            InputText,
            InputPassword
        },
        data() {
            return {
                emailData: {
                    value: '',
                    placeholder: 'Adresse email',
                    isRequired: true
                },
                passwordData: {
                    value: '',
                    placeholder: 'Mot de passe',
                    isRequired: true
                },
                userLogin: ''
            }
        },
        created() {
            this.$forceUpdate();
        },
        methods: {
            submit() {
                Vue.services.user.login(this.emailData.value, this.passwordData.value).then(result => {
                    Vue.localStorage.set("userLogin", result.data.user.data.email);
                    Vue.localStorage.set("userOrganization", result.data.user.data.github_organization);
                    Vue.localStorage.set("userId", result.data.user.data.id);
                    Vue.localStorage.set("userToken", result.data.token);
                    this.$forceUpdate();
                    this.$router.push("repository");
                }).catch(err => {
                    console.log(err);
                    alert(err.body);
                });
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .button-submit {
        width: 100%;
        margin-top: 10px;
    }
</style>
