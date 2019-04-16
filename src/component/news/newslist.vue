<template>
    <div>
        <!--图文列表-->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsData" :key="item.id">
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h5>{{item.title}}</h5>
                        <p class="mui-ellipsis">
                            <span>发表时间：{{item.add_time | dateFormat('YYYY-MM-DD')}}</span>
                            <span>点击次数:{{ item.click }}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "newslist",
        data() {
            return {
                newsData: []
            }
        },
        methods: {
            getNewData() {
                this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then(result => {
                        console.log(result)
                        if (result.body.status === 0) {
                            this.newsData = result.body.message
                        }
                    }
                )
            },
            getTime(tim) {
                return tim.substr(0, tim.indexOf("T"))
            }
        },
        directives: {},
        created() {
            this.getNewData();
        },
    }
</script>

<style scoped lang="scss">
    .mui-media-body {
        font-size: 16px;
        h5{
            font-weight: bold;
            color: black;
        }
        p span{
            font-size: 12px;
        }
        p span:nth-child(2){
            float: right;
        }
    }
</style>