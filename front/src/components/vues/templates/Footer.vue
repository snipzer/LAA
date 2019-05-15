<template>
    <div class="row" id="footer">
        <div class="col">
            <h2 class="text-footer">{{this.getAppName()}}</h2>
        </div>
        <div class="col">
            <h2 align="right">Version : {{version}}</h2>
        </div>
    </div>
</template>

<script>
    import packageInfo from '../../../../package.json';

    export default {
        name: "FooterPage",
        data: () => {
            return {
                version: packageInfo.version
            }
        },
        methods: {
            getAppName() {
                let name = packageInfo.name;
                let firstChar = packageInfo.name.charAt(0).toUpperCase();
                name = name.substring(1);
                return firstChar + name.replace(/_/g, " ")
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #footer {
        margin-top: 50px;
        border-top: 1px solid gray;
    }
</style>
