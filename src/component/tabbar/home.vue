<template>
    <div>
        <!--&lt;!&ndash;轮播图&ndash;&gt;-->
        <!--<mt-swipe :auto="4000">-->
            <!--<mt-swipe-item v-for="item in bannerList" :key="item.id"><img :src="item.img" alt=""></mt-swipe-item>-->
        <!--</mt-swipe>-->
        <!--六宫格-->
        <swiper :bannerList="bannerList" :bol="true"></swiper>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div>
            </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div>
            </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div>
            </a></li>


        </ul>
    </div>
</template>

<script>
    import swiper from '../subcomponent/swiper.vue'
    export default {
        name: "home",
        components:{
            swiper
        },
        data() {
            return {
                bannerList: []
            }
        },
        methods: {
            getBanner() {
                //    轮播图数据
                this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result => {
                    console.log(result)
                    if (result.body.status === 0) {
                        this.bannerList = result.body.message
                    }
                })
            },

        },
        created() {
            this.getBanner();
        }
    }
</script>

<style scoped lang="scss">
    /*.mint-swipe {*/
        /*height: 200px;*/

        /*.mint-swipe-item {*/
            /*background: darkgrey;*/

            /*img {*/
                /*width: 100%;*/
                /*height: 100%;*/
            /*}*/
        /*}*/
    /*}*/

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
        background-color: #fff;

        img {
            width: 50px;
            height: 50px;
        }
    }
</style>