/**
 * Created by Administrator on 14-4-13.
 */

var fs = require('fs');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
//var dir = 'D:/webdata/xuefowang/www.xuefo.net/nr/article21/';
var dir = 'D:/webdata/xuefowang/www.xuefo.net/nr/article19/';
var databaseUrl = 'jkfs'; // "username:password@example.com/mydb"
var collections = ["pages"]
var db = require("mongojs").connect(databaseUrl, collections);
//db.pages.drop();

fs.readdirSync(dir).forEach(
    function (file) {
        console.log(file);
        writeFileToDb(file);

    }
);

function writeFileToDb(filename) {
    //var filename='208304.html';
    var file = dir + filename;

    var data = fs.readFileSync(file);

    var content = iconv.decode(data, 'gb2312');
    var $ = cheerio.load(content);
    var txt = $('#AutoNumber1').text();
    var i = txt.indexOf('收藏');
    txt = txt.substr(i + 2, txt.length).trim();
    var path = 'title';
    var title = $(path).text().replace('－－学佛网', '');
//    console.log('title:'+title);
//    console.log(txt);

    var page = {};
    page.filename = filename;
    page.path = 'www.xuefo.net/nr/article21/';
    page.url = page.path + page.filename;
    page.content = content;
    page.txt = txt;
    page.title = title;
    db.pages.save(page);
    console.log(page.txt);

};

