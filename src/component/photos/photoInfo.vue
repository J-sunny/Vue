<template>
    <div class="photoInfo_content">
        <h5>{{textData.title}}</h5>
        <p class="mui-ellipsis">
            <span>发表时间：{{textData.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span style="float: right;margin-right: 30px">点赞：{{textData.click}}</span>
        </p>
        <hr>
        <!--缩略图-->
        <div class="thumbs">
            <vue-preview :slides="list"></vue-preview>
        </div>
        <!--图片内容-->
        <div class="content" v-html="textData.content">
        </div>
        <!--评论内容-->
        <div>
            <comment :id="id"></comment>
        </div>
    </div>
</template>

<script>
    import comment from '../subcomponent/comment.vue'

    export default {
        name: "photoInfo",
        data() {
            return {
                id: this.$route.params.id,
                textData: [],
                list: [],
            }
        },
        components: {
            comment
        },
        methods: {
            //获取缩略图
            getThoumbs() {
                this.$http.get('api/getthumimages/' + this.id).then(
                    result => {
                        if (result.body.status === 0) {
                            //遍历的补全图片的宽高 小图
                            result.body.message.forEach(item => {
                                //设置每条数据的宽高小图
                                item.msrc = item.src;
                                item.h = 400;
                                item.w = 600
                            })
                            this.list = result.body.message
                            console.log(this.list)
                        }
                    }
                )
            },
            //    获取文字内容
            getTexeData() {
                this.$http.get("api/getimageInfo/" + this.id).then(result => {
                    console.log(result.body)
                    if (result.body.status === 0) {
                        this.textData = result.body.message[0]
                    }
                })
            }
        },
        created() {
            this.getThoumbs();
            this.getTexeData();
        }
    }
</script>

<style scoped lang="scss">
    h5{
        color: #0062cc;
        font-weight: bold;
        text-align: center;
    }
    .content{
        font-size: 14px;
        margin-bottom: 20px;
    }
</style>