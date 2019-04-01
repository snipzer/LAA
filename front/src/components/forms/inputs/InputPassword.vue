<template>
    <input class="form-control base-input" type="password" v-model="value" :placeholder="placeholder">
</template>

<script>
    export default {
        name: 'InputPassword',
        props: {
            parentValue: String,
            parentPlaceholder: String,
        },
        data() {
            return {
                value: this.parentValue,
                placeholder: this.parentPlaceholder
            }
        },
        watch: {
            value(val) {
                this.$emit('input', val);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .base-input {
        margin-top: 10px;
    }
</style>
