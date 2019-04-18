<template>
    <div>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input @change="countChange" readonly class="mui-numbox-input" type="number" :value="initCount" ref="num"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>

    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min'

    export default {
        name: "goodsNum",
        props: ['initCount','goosid'],
        mounted() {
            //初始化数字框控件
            mui('.mui-numbox').numbox();
            console.log(this.max)
        },
        methods: {
        //    监听数据的改变
            countChange(){
                console.log(this.$refs.num.value);
                this.$store.commit('updataDatt',{id:this.goosid,count:this.$refs.num.value})
            }
        },
    }
</script>

<style scoped>

</style>