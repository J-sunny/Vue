<template>
    <div class="shopcar_container">
        <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.state.car[i].selected"
                               @change="selecteds(item.id,$store.state.car[i].selected)"
                    ></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p class="buttons">
                            <span class="price">价格{{item.sell_price}}</span>
                            <shopCar :initCount="$store.getters.getGoodsCont[item.id]"
                                     :goosid="item.id"></shopCar>
                            <a href="#" @click.prevent="remove(i,item.id)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            勾选商品：{{$store.getters.getTotal.count}}
            总价：{{$store.getters.getTotal.allPrice}}
        </div>
    </div>
</template>


<script>
    import shopCar from '../subcomponent/shopCar.vue'

    export default {
        name: "shopcar",
        data() {
            return {
                goodsList: []
            }
        },
        methods: {
            //    1.获取购物车商品列表
            getGoodsList() {
                //    获取商品的id
                let idArr = [];
                this.$store.state.car.forEach(item => idArr.push(item.id));
                if (idArr.length <= 0) return false;
                this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
                    if (result.body.status === 0) {
                        console.log(result.body)
                        this.goodsList = result.body.message
                    }
                })
            },
            //    2.点击删除
            remove(index, id) {
                this.goodsList.splice(index, 1);
                this.$store.commit('removeGoods', id)
            },
            //    3.更新状态
            selecteds(id, selected) {
                this.$store.commit('updataSelected', {id: id, selected: selected})
            },
        },
        components: {
            shopCar
        },
        created() {
            this.getGoodsList()
        }
    }
</script>

<style scoped lang="scss">
    .shopcar_container {
        overflow: hidden;
        background-color: #eee;

        .mui-card-content-inner {
            display: flex;
            align-items: center;

            img {
                width: 60px;
                height: 60px;
            }

            h1 {
                font-size: 14px;
            }

            .buttons {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .info {
                .price {
                    font-weight: bold;
                    color: red;

                }
            }
        }
    }
</style>