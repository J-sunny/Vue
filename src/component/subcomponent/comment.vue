<template>
    <div class="sub_container">
        <h4>发表评论</h4>
        <hr>
        <textarea v-model="msg" placeholder="请输入评论内容（最多吐槽120字）">
        </textarea>
        <mt-button class="" type="primary" size="large" @click="postComent">发表评论</mt-button>
        <div class="list" v-for="(item,i) in comment">
            <div class="user">
                第{{i}}楼 用户：{{item.user_name}}
                发表时间：{{item.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}
            </div>
            <div class="body">
                {{item.content}}
            </div>
        </div>
        <mt-button class="mint-button mint-button--danger mint-button--large is-plain" type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "comment",
        props: ['id'],
        data() {
            return {
                comment: [],
                msg: '',
                pageIndex:1//默认展示第一页
            }
        },
        methods: {
            getComment() {
                console.log(this.id)
                this.$http.get("api/getcomments/" + this.id + "?pageindex="+this.pageIndex).then(result => {
                        if (result.body.status === 0) {
                            console.log(result.body)
                            // this.comment = result.body.message
                            //拼接新数组
                          this.comment=this.comment.concat(result.body.message)
                        }
                    }
                )
            },
            //    发表评论
            postComent() {
                if (this.msg.trim().length == 0) {
                    Toast('内容不能为空')
                    return false;
                }
                //参数1.地址，2.交给服务器的对象3.定义提交格式为普通表单的格式，已经配置过，可省略
                this.$http.post('api/postcomment/' + this.id, {content: this.msg}).then(result => {
                    if (result.body.status === 0) {
                        Toast('提交成功')
                        console.log(111)
                    //    拼接出评论对象
                        let user={
                            user_name:"匿名用户",
                            add_time:Date.now(),
                            content:this.msg
                        }
                        this.comment.unshift(user);
                        this.msg=''
                    }
                })
            },
        //    点击加载更多
            getMore(){
                this.pageIndex++;
                this.getComment();
            }


        },
        created() {
            this.getComment();
        }
    }
</script>

<style scoped lang="scss">
    .sub_container {
        textarea {
            height: 80px;
            margin: 0px;
            font-size: 14px;
        }

        .list {
            margin: 5px 0px;

            .user {
                line-height: 30px;
                background-color: #ccc;
                font-size: 14px;
            }

            .body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
</style>