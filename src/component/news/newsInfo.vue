<template>
    <div class="newsInfo_content">
        <h4 class="title">{{newsInfos.title}}</h4>
        <p class="subTitle">
            <span>发表时间：{{newsInfos.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span>点击次数：{{newsInfos.click}}</span>
        </p>
        <hr>
        <!--内容区域-->
        <div v-html="newsInfos.content">
            内容
        </div>
        <!--评论区-->
        <div>
            <!--3.调用子组件-->
            <comment :id="id"></comment>
        </div>
    </div>
</template>

<script>
    //1.导入子组件
    import comment from '../subcomponent/comment.vue'

    export default {
        name: "newsInfo",
        //2.定义子组件
        components: {
            comment
        },
        data() {
            return {
                id: this.$route.params.id,
                newsInfos: {}
            }
        },
        methods: {
            getNewInfo() {
                this.$http.get("http://www.liulongbin.top:3005/api/getnew/" + this.id)
                    .then(result => {
                        if (result.body.status === 0) {
                            console.log(result.body)
                            this.newsInfos = result.body.message[0]
                        }
                    })

            }
        },
        created() {
            this.getNewInfo();
        }
    }
</script>

<style scoped lang="scss">
    .newsInfo_content {
        padding: 0px 5px;

        .title {
            font-size: 16px;
            text-align: center;
            color: red;
            margin: 20px 0px;
        }

        .subTitle {
            display: flex;
            justify-content: space-between;
            color: blue;
            font-size: 14px;
        }
    }
</style>