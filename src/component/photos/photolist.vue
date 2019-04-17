<template>
    <div>
        <!--顶部tabbar选项模块-->
        <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl"
                 class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id==0? 'mui-active':'']"
                       href="#item1mobile"
                       v-for="item in photoData" :key="item.id"
                       @click="getPhotoList(item.id)">
                        {{item.title}}
                    </a>
                </div>

            </div>
        </div>
        <!--图片列表区域-->
        <ul class="photoList">
            <router-link  tag="li" :to="'/home/photoInfo/'+item.id" v-for="item in photoListData" :key="item.id">
                <img v-lazy="item.img_url" alt="">
                <div class="txt">
                    <h5>{{item.title}}</h5>
                    <p class="mui-ellipsis-2">{{item.seo_description}}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //局部导入js文件
    import mui from '../../lib/mui/js/mui.min.js'
    //报错  而分析 1.mui.js可能使用到了caller,callee,argument等属性，但是webpack打包好的main.js中，可能默认启用了严格模式，所以两者冲突
    //解决方案1.把mui.js中的严格模式去掉
    //       2.把webpack中的严格模式移出
    export default {
        name: "photolist",
        data() {
            return {
                photoData: [],
                photoListData: []
            }
        },
        mounted() {
            //代表你的dom元素已经渲染完成
            //初始化
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005
            });
            //    3.tabbar栏失效，样式与导入的mui.js冲突，修改nui-tab-item的类名，样式
        },
        methods: {
            getPhont() {
                this.$http.get('api/getimgcategory').then(result => {
                    console.log(result)
                    if (result.body.status === 0) {
                        result.body.message.unshift({title: "全部", id: 0})
                        this.photoData = result.body.message
                    }
                })
            },
            //点击分类显示对应的图片列表
            getPhotoList(id) {
                this.$http.get('api/getimages/' + id).then(result => {
                    if (result.body.status === 0) {
                        this.photoListData = result.body.message
                    }
                })

            }
        },
        created() {
            this.getPhont()
        //    刷新时，触发图片列表
            this.getPhotoList(0);
        }
    }
</script>

<style scoped lang="scss">
    * {
        touch-action: pan-y;
    }

    .photoList {
        margin: 0;
        padding: 5px;
        li{
            background-color: grey;
            text-align: center;
            list-style: none;
            margin-bottom: 10px;
            box-shadow: 0px 0px 7px #999;
            position: relative;

            img{
                width: 100%;
                display: block;
            }
            .txt{
                background-color: rgba(0,0,0,0.5);
                width: 100%;
                position: absolute;
                bottom: 0;
                z-index: 9999;
                text-align: left;

                h5{
                    color: white;
                    font-weight: bold;
                }
                p{
                    line-height: 20px;
                    color: white;

                }
            }
        }
        /*懒加载图片的样式*/
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }
</style>