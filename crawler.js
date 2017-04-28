var http = require('http');
var https = require('https');
var cheerio = require('cheerio');
var fs = require('fs');

var entrance2 = 'http://www.imooc.com/course/landingpagephp'
var entrance = 'http://www.ivsky.com/'
var baiduhttps = 'https://www.baidu.com/'

var index = 0;

start(entrance,false);

function filterChapter(html){
  // console.log(html);
  var $ = cheerio.load(html);
  var chapters = $('img')
  chapters.each(function(item){
    var chapter = $(this);
    // console.log(chapter.attr('src').indexOf(':'));
    // console.log(chapter.attr('src').split('.').pop());
    if(chapter.attr('src')){
      if (chapter.attr('src').indexOf(':') != -1) {
        saveimg(chapter.attr('src'),index,chapter.attr('src').split('.').pop());
        index++;
      }else{
        console.log('此图片获取不到，可能是静态文件')
      }
    }else {
      console.log('此img没有src属性');
    }
    // console.log(chapter.attr('src'));
  })
}
function saveimg(url,name,format){
  http.get(url,function(res){
    var imgData = "";
    res.setEncoding("binary");

    res.on("data",function(chunk){
      imgData +=chunk;
    })
    res.on("end", function(){
      fs.writeFile("./img/"+name+"."+format, imgData, "binary", function(err){
          if(err){
              console.log(err);
          }
          console.log("down success");
      });
    });
  })
}

function start(url,isReturn){
  if(url.split(":")[0]=='http'){
    console.log('http');
    http.get(url,function(res){
      var html = ''
      res.on('data',function(data){
        html+=data
      })
      res.on('end',function(){
        // console.log(html);
        filterChapter(html)

        if(isReturn){
          return
        }else {
          // start(entrance2,true);
          console.log('finish!!!!!');
        }
      })
    }).on('error',function(){
      console.log('获取数据失败');
    })
  }else if(url.split(":")[0]=='https') {
    console.log('https');
    https.get(url,function(res){
      var html = ''
      res.on('data',function(data){
        html+=data
      })
      res.on('end',function(){
        // console.log(html);
        filterChapter(html)

        if(isReturn){
          return
        }else {
          // start(entrance2,true);
          console.log('finish!!!!!');
        }
      })
    }).on('error',function(){
      console.log('获取数据失败');
    })
  }else{
    console.log('请重新选择入口')
  }
  // httx.get(url,function(res){
  //   var html = ''
  //   res.on('data',function(data){
  //     html+=data
  //   })
  //   res.on('end',function(){
  //     // console.log(html);
  //     filterChapter(html)
  //
  //     if(isReturn){
  //       return
  //     }else {
  //       // start(entrance2,true);
  //       console.log('finish!!!!!');
  //     }
  //   })
  // }).on('error',function(){
  //   console.log('获取数据失败');
  // })
}
