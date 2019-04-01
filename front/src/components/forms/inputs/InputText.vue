<template>
    <input class="form-control base-input" type="text" v-model="value" :placeholder="placeholder" :required="isRequired">
</template>

<script>
    export default {
        name: 'InputText',
        props: {
            parentValue: String,
            parentPlaceholder: String,
            parentIsRequired: Boolean
        },
        data() {
            return {
                value: this.parentValue,
                placeholder: this.parentPlaceholder,
                isRequired: this.parentIsRequired
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
