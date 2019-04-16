<template>
    <div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
    //1.导入子组件
    import comment from '../subcomponent/comment.vue'

    export default {
        name: "goodscomment",
        data() {
            return {
                id: this.$route.params.id,
            }
        },
        //2.定义子组件
        components: {
            comment
        },
    }
</script>

<style scoped>

</style>