#这是一个市值500亿的项目
##嘘 。。。。用心去感受他的价值
### 这个代码只可意会不可言传
#### 告辞
##-----------------------手动分割---------------------
##制作首页app组件
1.完成header组件，使用的是Mint中的组件
2.制作底部tabbar区域，使用的是mui中的tabbar区域+运用到拓展图标的css样式，需要手动导入在index.js入口文件里面
3.在中间放置了router-view来展示路由匹配到的组件
##设置路由高亮
##改造tabbar中的a标签为router-link
##制作home页面
1.渲染轮播图  ---获取数据vue-resource.js  调用this.$http.get(url).then(成功的函数，失败的函数)
2.使用mui中的九宫格
##封装评论的组件
1.搭建静态页面
2.使用mui中的Toast提示（先导入  import {Toast} from 'mint-ui'）
3.复制出mui中静态页面的样式，加上自己的类名，因为会与mint中的相关元素冲突，会报错
4.加载更多按钮，使用数组拼接（ this.comment=this.comment.concat(result.body.message)）
##制作home界面下面的新闻资讯分页
1.使用mui的图文列表搭建页面
2.渲染页面数据 ---获取数据调用this.$http.get(url).then(成功的函数，失败的函数)
##制作新闻资讯详情页面
1.在路由配置路径时传入当前点击新闻的id
2.在data里面接收传过来的id（id: this.$route.params.id）根据id渲染详情页面
3.导入封装的评论的组件，在components中定义组件
##制作图片分享页面
1.使用mui顶部选项卡-可左右拖动组件，制作顶部选项卡
2.渲染页面
##制作图片详情页面
1.渲染页面
2.3.导入封装的评论的组件，在components中定义组件
##制作商品购买页面
1.渲染页面
2.加载更多，加载更多按钮，使用数组拼接（ this.comment=this.comment.concat(result.body.message)）
##制作商品详情页面
1.使用mui卡片视图
2.渲染页面
#图文介绍界面
1.使用v-html渲染页面
#商品评论页面
1.导入封装的评论的组件，在components中定义组件


