//1.导入vue
import Vue from 'vue'
//导入公共组件
import app from  './app.vue'
//导入路由
import router from './router.js'
//导入mui模板
import './lib/mui/css/mui.min.css'
//导入mui拓展图标
import  './lib/mui/css/icons-extra.css'
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
Vue.http.options.root='http://www.liulongbin.top:3005/'
//配置全局post请求时表单的格式为普通表单格式
Vue.http.options.emulateJSON=true;

//导入事件插件
import moment from 'moment'
Vue.filter('dateFormat',function (dataStr,pattern='YYYY-MM-DD HH:mm:ss') {
    //参数1：需要格式化的事件数据
    //    2.时间的格式
  return moment(dataStr).format(pattern)
})

//导入图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//导入外部样式
import '../src/app.scss'

let vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router
})