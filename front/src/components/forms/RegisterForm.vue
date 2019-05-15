<template>
    <div class="row">
        <div class="col"></div>
        <div class="col">
            <div v-if="errors.length">
                <b>S'il vous plait, corriger les erreurs suivantes:</b>
                <ul>
                    <li v-for="error in errors" :key="error.id">{{ error }}</li>
                </ul>
            </div>
            <div class="form-group">
                <InputText v-model="emailData.value" :placeholder="emailData.placeholder"></InputText>
                <InputText v-model="githubLoginData.value" :placeholder="githubLoginData.placeholder"></InputText>
                <InputText v-model="githubOrganizationData.value" :placeholder="githubOrganizationData.placeholder"></InputText>
                <InputText v-model="githubTokenData.value" :placeholder="githubTokenData.placeholder"></InputText>
                <InputPassword v-model="passwordData.value" :placeholder="passwordData.placeholder"></InputPassword>
                <InputPassword v-model="passwordConfirmData.value" :placeholder="passwordConfirmData.placeholder"></InputPassword>
                <button class="btn btn-primary button-submit" v-on:click="submit()">Créer mon compte !</button>
            </div>
        </div>
        <div class="col"></div>
    </div>
</template>

<script>
    import InputPassword from './inputs/InputPassword.vue';
    import InputText from './inputs/InputText.vue';
    import Vue from 'vue';
    import _ from 'underscore';

    export default {
        name: "RegisterForm",
        components: {
            InputText,
            InputPassword
        },
        data() {
            return {
                errors: [],
                emailData: {
                    value: '',
                    placeholder: 'Adresse email',
                },
                githubLoginData: {
                    value: '',
                    placeholder: 'Identifiant github',
                },
                githubOrganizationData: {
                    value: '',
                    placeholder: 'Organisation github',
                },
                githubTokenData: {
                    value: '',
                    placeholder: 'Token github',
                },
                passwordData: {
                    value: '',
                    placeholder: 'Mot de passe',
                },
                passwordConfirmData: {
                    value: '',
                    placeholder: 'Confirmer le mot de passe',
                },
                userLogin: ''
            }
        },
        methods: {
            checkEmptyData() {
                if(_.isEmpty(this.emailData.value)) {
                    this.errors.push("L'addresse email est obligatoire.");
                }
                if (_.isEmpty(this.passwordConfirmData.value) || _.isEmpty(this.passwordData.value)) {
                    this.errors.push("Les champs mot de passes sont obligatoire.");
                }
                if (_.isEmpty(this.githubLoginData.value)) {
                    this.errors.push("Le champ login github est obligatoire.");
                }
                if (_.isEmpty(this.githubOrganizationData.value)) {
                    this.errors.push("Le champ organisation github est obligatoire.");
                }
                if (_.isEmpty(this.githubTokenData.value)) {
                    this.errors.push("Le champ token de github est obligatoire.");
                }
                return this.errors.length === 0;
            },
            checkDataCoherence() {
                if (this.passwordData.value !== this.passwordConfirmData.value) {
                    this.errors.push("Les mots de passes ne corresponde pas !");
                } else if (!Vue.utils.verificationForm.checkEmail(this.emailData.value)) {
                    this.errors.push("L'adresse email doit être un email !");
                }
                return this.errors.length === 0;
            },
            checkData() {
                this.errors = [];
                return this.checkEmptyData() && this.checkDataCoherence();
            },
            submit() {
                if(this.checkData()) {
                    Vue.services.user.register(this.emailData.value, this.passwordData.value, this.githubLoginData.value, this.githubOrganizationData.value,this.githubTokenData.value).then(result => {
                        this.$router.push("login");
                    }).catch(err => console.log(err));
                }
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
