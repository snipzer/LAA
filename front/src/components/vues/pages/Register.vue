<template>
    <div class="row">
        <div class="col">
            <p>Toutes les informations demander sont requises, stockée et utiliser avec des cookies.</p>
            <p>Si vous n'êtes pas d'accords avec sa, aller voir ailleurs.</p>
        </div>
        <div class="col">
            <RegisterForm></RegisterForm>
        </div>
        <div class="col"></div>
    </div>
</template>

<script>
    import RegisterForm from "../../forms/RegisterForm.vue";
    export default {
        name: "Register",
        components: {
            RegisterForm
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
