<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div v-if="errors.length">
                        <b>S'il vous plait, corriger les erreurs suivantes:</b>
                        <ul>
                            <li v-for="error in errors" :key="error.id">{{ error }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <InputText v-model="emailData.value" :placeholder="emailData.placeholder"></InputText>
                        <InputText v-model="githubLoginData.value" :placeholder="githubLoginData.placeholder"></InputText>
                        <InputText v-model="githubOrganizationData.value" :placeholder="githubOrganizationData.placeholder"></InputText>
                        <InputText v-model="githubTokenData.value" :placeholder="githubTokenData.placeholder"></InputText>
                        <button class="btn btn-primary button-submit" v-on:click="updateUserBody()">Modifier le compte !</button>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <InputPassword v-model="oldPasswordData.value" :placeholder="oldPasswordData.placeholder"></InputPassword>
                        <InputPassword v-model="passwordData.value" :placeholder="passwordData.placeholder"></InputPassword>
                        <InputPassword v-model="passwordConfirmData.value" :placeholder="passwordConfirmData.placeholder"></InputPassword>
                        <button class="btn btn-primary button-submit" v-on:click="updateUserPassword()">Modifier le mot de passe !</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import InputPassword from './inputs/InputPassword.vue';
    import InputText from './inputs/InputText.vue';
    import Vue from 'vue';
    import _ from 'underscore';

    export default {
        name: "UpdateUserForm",
        components: {
            InputText,
            InputPassword
        },
        data() {
            return {
                user: null,
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
                oldPasswordData: {
                    value: '',
                    placeholder: 'Ancien mot de passe'
                },
                passwordData: {
                    value: '',
                    placeholder: 'Nouveau mot de passe',
                },
                passwordConfirmData: {
                    value: '',
                    placeholder: 'Confirmer le nouveau mot de passe',
                },
                userLogin: ''
            }
        },
        async created() {
            await this.getUser();
        },
        methods: {
            async getUser() {
                Vue.services.user.getUser(Vue.localStorage.get("userToken"), Vue.localStorage.get("userId")).then(user => {
                    this.user = user;
                    console.log(user);
                }).catch(err => {
                    console.log(err);
                    alert(err.body);
                });
            },
            checkEmptyData() {
                if(_.isEmpty(this.emailData.value)) {
                    this.errors.push("L'addresse email ne peut pas être vide !");
                }
                if (_.isEmpty(this.githubLoginData.value)) {
                    this.errors.push("Le champ login github ne peut être vide.");
                }
                if (_.isEmpty(this.githubOrganizationData.value)) {
                    this.errors.push("Le champ organisation github ne peut être vide.");
                }
                if (_.isEmpty(this.githubTokenData.value)) {
                    this.errors.push("Le champ token de github ne peut être vide.");
                }
                return this.errors.length === 0;
            },
            checkDataCoherence() {
                if (!Vue.utils.verificationForm.checkEmail(this.emailData.value)) {
                    this.errors.push("L'adresse email doit être un email !");
                }
                return this.errors.length === 0;
            },
            checkData() {
                this.errors = [];
                return this.checkEmptyData() && this.checkDataCoherence();
            },
            updateUserBody() {
                if(this.checkData()) {
                    Vue.services.user.register(this.emailData.value, this.passwordData.value, this.githubLoginData.value, this.githubOrganizationData.value,this.githubTokenData.value).then(result => {
                        this.$router.push("login");
                    }).catch(err => console.log(err));
                }
            },
            checkPassword() {
                this.errors = [];
                if (_.isEmpty(this.oldPasswordData.value) || _.isEmpty(this.passwordConfirmData.value) || _.isEmpty(this.passwordData.value)) {
                    this.errors.push("Les champs mot de passes ne peuvent être vide.");
                } else if (this.passwordData.value !== this.passwordConfirmData.value) {
                    this.errors.push("Les mots de passes ne corresponde pas !");
                }
                return this.errors.length === 0;
            },
            updateUserPassword() {
                if(this.checkPassword()) {

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
