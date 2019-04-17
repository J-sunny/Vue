<template>
    <div class="goodInfo_content">
        <!--小球-->
        <transition
                @before-enter="beforEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="flag"></div>

        </transition>

        <!--商品轮播图-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :bannerList="banners"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsData.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <del>{{goodsData.market_price}}元</del>
                        销售价：<span class="nowPrice">{{goodsData.sell_price}}元</span>
                    </p>
                    <p class="">
                        购买数量：{{goodsData.stock_quantity}}个
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addcar">加入购物车</mt-button>
                    </p>
                </div>
            </div>

        </div>
        <!--商品参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsData.goods_no}}</p>
                    <p>库存情况：{{goodsData.stock_quantity}}件</p>
                    <p>上架时间：{{goodsData.add_time | dateFormat('YYYY-MM-DD')}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" class="is-plain" @click="getDelict(goodsData.id)">图文介绍
                </mt-button>
                <mt-button type="danger" size="large" class="is-plain" @click="getComment(goodsData.id)">商品评论
                </mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import swiper from '../subcomponent/swiper.vue'

    export default {
        name: "goodsinfo",
        data() {
            return {
                banners: [],
                id: this.$route.params.id,
                goodsData: [],
                flag: false
            }
        },
        components: {
            swiper
        },
        methods: {
            //    1.获取轮播图数据
            getBanner() {
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        //    添加src  应为封装好了的组件设置的是item.img,不一致，所以遍历的追加一个item.img
                        result.body.message.forEach(item => {
                            item.img = item.src
                        })
                        this.banners = result.body.message

                    }
                })
            },
            //2获取商品参数区和价格，标题等数据
            getGoodsData() {
                this.$http.get("api/goods/getinfo/" + this.id).then(result => {
                    console.log(result.body)
                    this.goodsData = result.body.message[0]
                })
            },
            //    3图文详情跳转
            getDelict(id) {
                this.$router.push('/home/goodsdelict/' + id)
            },
            //   4 商品评论跳转
            getComment(id) {
                this.$router.push('/home/goodscomment/' + id)
            },
            //    5点击添加购物车
            addcar() {
                this.flag = !this.flag
            },
            //    6.设置小球的动画
            beforEnter(el) {
                el.style.transform = 'translate(0,0)'
            },
            enter(el, done) {
                el.offsetWidth;
                //因分辨率不同，需要计算坐标值---》Element.getBoundingClientRect()
                //获取小球的位置
                let ball = document.querySelector('.ball').getBoundingClientRect();
                //获取徽标的位置  关于dom元素和所在的组件没有任何关系
                let badge=document.querySelector('.mui-badge').getBoundingClientRect();
                let x=badge.left-ball.left;
                let y=badge.top-ball.top;
                el.style.transform =` translate(${x}px,${y}px)`;
                el.style.transition = "all 1s cubic-bezier(.4,-0.3,.89,.67)"
                done();
            },
            afterEnter() {
                this.flag = !this.flag
            }
        },
        created() {
            this.getBanner();
            this.getGoodsData();
        }
    }
</script>

<style scoped lang="scss">
    .goodInfo_content {
        background-color: #eee;
        /*解决垂直方向外边距塌陷问题*/
        overflow: hidden;

        .nowPrice {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }

        .mui-card-footer {
            display: block;

            button {
                margin-bottom: 10px;
            }
        }

        .ball {
            width: 15px;
            height: 15px;
            background-color: palegreen;
            -webkit-border-radius: 50%;
            position: absolute;
            left: 150px;
            top: 420px;
            z-index: 9999;
        }

    }
</style>