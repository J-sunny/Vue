//
import Vue from 'vue'
//1.导入路由模块
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)

//2.导入对应的路由组件
import Home from './component/tabbar/home.vue'
import Member from './component/tabbar/member.vue'
import ShopCar from './component/tabbar/shopcar.vue'
import Search from './component/tabbar/search.vue'
import NewList from './component/news/newslist.vue'
import NewsInfo from './component/news/newsInfo.vue'
import PhontList from './component/photos/photolist.vue'
import PhotoIngo from './component/photos/photoInfo.vue'
import GoodsList from './component/goods/goodslist.vue'
import GoodsInfo from './component/goods/goodsinfo.vue'
import GoodsDetil from './component/goods/goodsdelict.vue'
import GoodsComment from './component/goods/goodscomment.vue'

//3.创建路有对象
let router=new VueRouter({
    //设置路由切换高亮显示
    linkActiveClass:'mui-active',
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/shopcar',component:ShopCar},
        {path:'/search',component:Search},
        {path:'/home/newslist',component:NewList},
        {path:'/home/newsInfo/:id',component:NewsInfo},
        {path:'/home/photolist',component:PhontList},
        {path:'/home/photoInfo/:id',component:PhotoIngo},
        {path:'/home/goodslist',component:GoodsList},
        {path:'/home/goodsinfo/:id',component:GoodsInfo,name:"goodsInfo"},
        {path:'/home/goodsdelict/:id',component:GoodsDetil},
        {path:'/home/goodscomment/:id',component:GoodsComment}

    ]
})

//4.把路有对象暴露出去
export default router