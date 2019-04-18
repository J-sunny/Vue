<template>
    <div>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0' :data-numbox-max='max'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" value="1" @change="countChange" ref="num"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>

    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min'

    export default {
        name: "goodsNum",
        props: ['max'],
        mounted() {
            //初始化数字框控件
            mui('.mui-numbox').numbox();
            console.log(this.max)
        },
        watch: {
            //监听数字的改变:只要值改变，就立马设置最大值
            'max': function (newVal) {
                console.log(newVal)
                mui('.mui-numbox').numbox().setOption('max', newVal)

            }
        },
        methods: {
            countChange() {
                this.$emit('getCount',parseInt(this.$refs.num.value))
                //给元素添加ref属性，值自己定义，就能得到$refs对象，就可以通过这个对象获取对应节点的一系列值
                this.$refs.num.value
            }
        },
        created() {
        }
    }
</script>

<style scoped>

</style>