//1.导入vue
import Vue from 'vue'
//导入公共组件
import app from './app.vue'
//导入路由
import router from './router.js'
//导入mui模板
import './lib/mui/css/mui.min.css'
//导入mui拓展图标
import './lib/mui/css/icons-extra.css'
//导入mui的js
// import './lib/mui/js/mui.min.js'
//导入mint-ui
import MintUi from 'mint-ui'

Vue.use(MintUi)
import 'mint-ui/lib/style.css'
//导入vue-resourse模块
import VueResource from 'vue-resource'

Vue.use(VueResource)
//全局匹配请求的更路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
//配置全局post请求时表单的格式为普通表单格式
Vue.http.options.emulateJSON = true;

//导入事件插件
import moment from 'moment'

Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    //参数1：需要格式化的事件数据
    //    2.时间的格式
    return moment(dataStr).format(pattern)
})

//导入图片预览插件
import VuePreview from 'vue-preview'

Vue.use(VuePreview)
//导入外部样式
import '../src/app.scss'


//导入vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//每次加载页面时，先从本地存储获取数据
let car = JSON.parse(localStorage.getItem('list') || '[]')

let store = new Vuex.Store({
    state: {
        car
    },
    mutations: {
        //    1.点击添加到购物车  把信息保存store 中的  car
        addToCar(state, obj) {
            //    分析：如果有对应的商品，更新数据  没有对应的直接添加
            let flag = false;
            state.car.some(item => {
                if (item.id == obj.id) {
                    item.count += obj.count
                    flag = true;
                    return true;
                }
            })
            //    如果没有找到
            if (!flag) {
                state.car.push(obj)
            }

            //    将数据存到loaclstrong
            localStorage.setItem('list', JSON.stringify(state.car))
        },
        //    4.更新数量
        updataDatt(state, obj) {
            state.car.some(item => {
                //判断id是否一致
                if (item.id == obj.id) {
                    item.count = parseInt(obj.count);
                    return true;
                }
            })
            localStorage.setItem('list', JSON.stringify(state.car))
        },
        //    5.删除数量
        removeGoods(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true;
                }
            })
            localStorage.setItem('list', JSON.stringify(state.car))
        },
        // 6.更新商品的状态
        updataSelected(state, obj) {
            state.car.some(item => {
                if (item.id == obj.id) {
                    item.selected = obj.selected;
                    return true;
                }
            })
            localStorage.setItem('list', JSON.stringify(state.car))
        },
    },
    getters: {
        //    2.计算徽标的值
        getCount(state) {
            let sum = 0;
            state.car.forEach(item => {
                sum += item.count
            })
            return sum;
        },
        //    3.获取商品数量的方法
        getGoodsCont(state) {
            let num = {}
            state.car.forEach(item => {
                num[item.id] = item.count;
            })
            return num;
        },
        //    7.计算总价
        getTotal(state) {
            let num = {
                count: 0,//存放数量
                allPrice: 0//存放总价
            }
            state.car.forEach(item => {
                //    判断商品为选中的状态
                if (item.selected) {
                    num.count+=item.count;
                    num.allPrice+=item.count*item.price;
                }
            })
            return num;
        }
    }
})


/*
* 1.手机和电脑在同一WiFi
* 2.在项目  package.json文件中  dev 脚本 添加一个指令：   --host wifi的ip地址
* */

let vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})