<template>
<div>
    <el-button type="danger" @click="logoutStore">登出</el-button>
</div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {

    },
    methods: {
        logoutStore() {
            this.$store.dispatch('logout')
        }
    }
}
</script>
