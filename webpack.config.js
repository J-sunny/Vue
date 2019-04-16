// 由于webpack是基于node构建的，所以在配置文件时，任何合法支持node代码都是支持的
const path = require('path');
//导入在内存中生成html页面的插件
//这个插件的两个作用：
//    1.自动在内存中根据指定页面生成了一个内存页面
//    2.自动把打包好的main.js追加到页面
const htmlWebpackPlugin = require('html-webpack-plugin')
//2.通过node的模块操作，向外暴露一个配置对象
module.exports = {
//    配置打包的模式
    mode: 'development',
//    配置入口路径：要打包的文件
    entry: path.join(__dirname, './src/index.js'),
//    配置出口路径:指定打包好的文件
    output: {
        path: path.join(__dirname, './dist'),//指定输出的路径
        filename: 'main.js'//指定输出文件的名字
    },
    //方法二
    // devServer:{
    //     open:true,//自动打开浏览器
    //     port:3000,//端口号
    //     hot:true//热更新
    //
    // }


//    配置插件----所有的webpack的插件都配置在这里
    plugins: [
        //创建一个在内存中生成html的插件
        new htmlWebpackPlugin({
            //    配置指定模板文件的路径
            template: path.join(__dirname, './src/index.html'),
            //设置生成内存页面的名称
            filename: 'index.html'
        })
    ],
//    配置所有的第三方loader模块
    module: {
        //    第三方模块的匹配规则
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.(png|jpg|gif|jpeg)$/, use: 'url-loader?limit>600&name=[name][hash:8].[ext]'},
            //    base64格式的图片能减少二次请求，只有小图片能转
            //    设置图片的大小限制  传参？limit=图片的大小字节
            //    当图片大小>设置的图片大小字节  转hash值
            //    当图片大小<设置的图片大小字节  转base64格式的图片
            //    如果想用自己的名字，加第二个参数 &name=[name].[ext]

            //    为了防止图片重名被覆盖，再加一个hash值&name=[hash:8][name].[ext]
            //    hash值相当于DNA，能保证两个数据的hash不可能相同 最多32位
            {test: /\.ttf|eot|svg|woff|woff2$/, use: 'url-loader'},
            //    配置babel来转换高级的js语法
            //      注意1.在配置时，必须要把node_modules目录排除在外
            //      原因：不排除的话，babel会把node_modules里面所有的js文件，全部打包编译，会非常消耗电脑CPU，痛死打包速度也会非常慢
            //      注意2.在项目的更目录中，新建 .babelrc,这个文件  相当于json文件   配置相关的babel参数
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {test:/\.vue$/,use:'vue-loader'}

        ]
    },
//    配置修改路径
    resolve: {
        //修改vue被导入时的路径
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    }

}