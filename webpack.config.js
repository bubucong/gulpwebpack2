/**
 * Created by lsc on 2016/8/10.
 */
var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    context: path.join(__dirname, 'src'),
    //webpack打包入口点
    entry:{
        //__dirname变量中保存了当前项目的根目录
        'MainPage/MainPage':__dirname+"/src/mainPage/MainPage.js",
        vendor: ['jquery',"vue"] //第三方库
    },
    //webpack打包输出点
    output:{
        filename:"[name]_bundle.js"//[chunkhash:6]这里的意思是动态添加6位hash码，从而使浏览器的js文件保持更新而不会被缓存
    },
    module:{
        loaders:[
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            {test: /\.scss$/,loader: 'style-loader!css-loader!sass-loader'}
        ]
    },
    resolve:{
        root: [process.cwd() + '\\src', process.cwd() + '\\node_modules'],
        extensions: ['', '.js', '.json', '.scss']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor','common/libs/vendor_bundle.js'),//这是第三方库打包生成的文件
        //new ExtractTextPlugin("[name].css",{allChunks:true}),//在使用这个插件的时候，会对所有的入口点文件生成独立的css,但是当{allChunks:true}时在所有的入口点文件中所引用的样式文件，都会被合并到生成的入口点样式文件当中。
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })//在这里可以为所有的webpack module提供$对象
        //new CopyWebpackPlugin([
        //    {from: 'mainPage/MainPage.html',to:"/MainPage", toType: 'dir'},//添加了toType属性后，就可以将页面拷贝到文件夹中
        //    {from: 'SubPages/SubPage1/SubPage1.html',to:"/SubPages/SubPage1", toType: 'dir'}
        //])
    ]
}
