const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {merge} = require('webpack-merge')


require('@babel/polyfill')


module.exports = (env, opts) => {
  const config = {
    resolve: {
      extensions: ['.vue', '.js', ]
    },
    entry: {
      app:[
        '@babel/polyfill',
        path.join(__dirname, 'main.js')  // app: 진입점 별명 // dirname: 현재 파일 
      ]
    },

    //결과물에 대한 설정
    output:{
      filename: '[name].js',              // [name]: 진입점 이름. app.js
      path: path.join(__dirname, 'dist')  // dist 디렉토리에 app.js라는 결과를 냄
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,  // 해석하지 않음
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [                   
            'vue-style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html')
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'assets/',
            to:''
          }
        ]
      }),
    ],
  }
  
  // 개발용
  if(opts.mode === 'development'){
    return merge(config, {
      devtool: 'eval',                     // 웹팩 빌드시간 최소화, 디버깅 가능. 용량이 커짐
      devServer: {
        open: true,
        hot: true
      }
    })
  // 제품용
  } else{
    return merge(config, {
      devtool: 'cheap-module-source-map',  // 빌드시간 김, 디버깅 가능. 용량이 작아짐
      plugins: [
        new CleanWebpackPlugin()
      ],
      devServer: {
        open: true,
        hot: true
      }
    })
  }  
}
