var http = require('http');
var url = 'http://www.imooc.com/course/landingpagephp'
var cheerio = require('cheerio');
var fs = require('fs');

function filterChapter(html){
  // console.log(html);
  var index = 0;
  var $ = cheerio.load(html);
  var chapters = $('img')
  chapters.each(function(item){
    var chapter = $(this)
    console.log(chapter.attr('src').indexOf(':'));
    if (chapter.attr('src').indexOf(':') != -1) {
      saveimg(chapter.attr('src'),index);
      index++;  
    }
    // console.log(chapter.attr('src'));
  })
}
function saveimg(url,name){
  http.get(url,function(res){
    var imgData = "";
    res.setEncoding("binary");

    res.on("data",function(chunk){
      imgData +=chunk;
    })
    res.on("end", function(){
      fs.writeFile("./img/"+name+".jpg", imgData, "binary", function(err){
          if(err){
              console.log(err);
          }
          console.log("down success");
      });
    });
  })
}

http.get(url,function(res){
  var html = ''
  res.on('data',function(data){
    html+=data
  })
  res.on('end',function(){
    // console.log(html);
    filterChapter(html)
  })
}).on('error',function(){
  console.log('获取数据失败');
})
