/**
 * Created by Administrator on 2017/11/2.
 */
/*1.任务名称
* 2.源码src 管道-压缩css-管道 接到 输出位置dist*/

var gulp = require("gulp");
var connect = require("gulp-connect");
var clean = require("gulp-clean")
/*1.task("字符串-任务名称","函数 - 任务内容")*/
gulp.task("hello",function(){
  console.log("hello world!!!!")
});

/*复制HTML到dist
* src() 输入源头
* pipe() 管道接通任务
* dest() 输出目标*/
gulp.task("copyHTML",function(){
  return gulp.src("./src/index.html").pipe(gulp.dest("dist"))
})

/*复制所有HTML*/
gulp.task("copyAllHtml",function(){
  // return gulp.src("./src/*.html").pipe(gulp.dest("dist/public"))
  //复制某几个文件
  return gulp.src(["./src/index.html","./src/index2.html","./src/css/*.css","!./src/css/style3.css"])
    .pipe(gulp.dest("./dist/public"))
    .pipe(connect.reload())
  //多个后缀名

})

gulp.task("copyImage",function(){
  return gulp.src("./src/images/*.{png,jpg}").pipe(gulp.dest("./dist/public/images"))
})

//执行多个task
//要执行build 任务，依赖于copyAllHtml,copyImage
gulp.task("build",["copyAllHtml","copyImage"],function(){
  console.log("build执行成功");
})

/*==========删除文件========*/
gulp.task("clean",function(){
  return gulp.src("./dist").pipe(clean())
})
//监听变化
gulp.task("myWatch",function(){
  gulp.watch("./src/*",["rebuild"])
});


gulp.task("rebuild",["clean"],function(){
  console.log("rebuild");
  // task执行另外一个task
  gulp.start("build")
})

/*==========自动实时刷新==========*/
// var connect = require("gulp-connect");

//创建server
gulp.task("server",function(){
  connect.server({
    root:"dist/public", //服务器访问根目录
    livereload:true //实时刷新
  })
})

/*=======browser sync=========*/
var bs = require("browser-sync")
gulp.task("browsersync",function(){
  var files=["dist/**/*.html","dist/*"]
  /*init初始化执行browsersync*/
  bs.init(files,{server:{baseDir:"./dist/public"}})
})


/*============Gulp-concat 合并文件CSS/JS=============*/
var concat = require("gulp-concat");
gulp.task("concatJS",function(){
  return gulp.src("./src/js/*.js")
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("./dist/public/js"))
})

/*==========Gulp-uglify - 压缩JS*/
var uglify = require("gulp-uglify");
gulp.task("uglify",function(){
  return gulp.src("./src/js/*.js")
    .pipe(uglify({
      mangle:true,
      compress:false,
      output:{
        comments:"all"
      }
    }))
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("./dist/public/js"))
})

/*=========Gulp-clean-css 压缩CSS*/
var cleancss = require("gulp-clean-css");
gulp.task("cleancss",function(){
  return gulp.src("./src/css/*.css")
    .pipe(cleancss({
      level:2, //1-单个属性 2-整个声明
      format:{
        breaks:{
          afterRuleEnds:true
        }
      }
    }))
    .pipe(gulp.dest("./dist/public/css"))
})

/*==========重命名========*/
var rename = require("gulp-rename");
gulp.task("myRename",function(){
  return gulp.src("./src/css/*.css")
    .pipe(concat("new.css"))
    .pipe(gulp.dest("./dist/public/css")) //concat之后输出，不会变
    .pipe(cleancss())
    .pipe(rename("newcleancss.css"))
    .pipe(gulp.dest("./dist/public/css2")); //重新输出
});
/*===========gulp-file-include 添加公共部分*/
var fileInclude = require("gulp-file-include");
gulp.task("includefile",function(){
  return gulp.src("./src/*.html")
    .pipe(fileInclude({
      prefix:"@@",
      basepath:"@file"
    }))
    .pipe(gulp.dest("./dist/public"))
});


/*=============改变输出文件引入的js地址 gulp-cheerio*/
var cheerio = require("gulp-cheerio");
gulp.task("changelink",function(){
  return gulp.src("./dist/public/*.html")
    .pipe(cheerio(function($){
      $("script").remove()
      $("body").append("<script src='js/vendor.js'></script>")
      //link.remove head.append
    }))
    .pipe(gulp.dest("./dist/public"))
})






