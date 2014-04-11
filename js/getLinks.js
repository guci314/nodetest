/**
 * Created by Administrator on 14-4-11.
 */

var keyword='常善法师 下载TXT文件';
var site='www.xuefo.net';

var request = require('request');
var cheerio = require('cheerio');
var tidy = require('htmltidy').tidy;
var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["links"]
var db = require("mongojs").connect(databaseUrl, collections);
db.links.drop();

var url='http://www.baidu.com/s?wd='+keyword+'%20site%3A'+site+'&pn=0&tn=baiduhome_pg&ie=utf-8&rsv_page=-1';

request(url, function (error, response, html) {
    if (!error) {
        tidy(html, scraplinks);
    }
});

function printLinkContent(url1){
    request(url, function (error, response, html) {
        if (!error){
            console.log(html);
        }
        else
        {
            debugger;
          console.log(error.toString());
        }
    });
};

var scraplinks = function (err, html1) {
    //console.log(html1);
    var $ = cheerio.load(html1);
    var path = 'h3 a';//table tbody tr td table#table2 tbody tr td html body div div
    var s = $(path).each(function(i, elem) {
        var l={};
        l.category='常善法师';
        l.title=$(this).text();
        l.href=$(this).attr('href');
        printLinkContent(l.href);
        //db.links.save(l);
        console.log($(this).text());
        console.log($(this).attr('href'));
    });
    //console.log(s);
};