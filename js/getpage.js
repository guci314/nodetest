/**
 * Created by Administrator on 14-4-10.
 */

var request = require('request');
var cheerio = require('cheerio');
//var xpath = require('xpath');
//var dom = require('xmldom').DOMParser;
var tidy = require('htmltidy').tidy;
//var parser = require('libxml-to-js');
//qqyy
//var qqyy = 'http://www.qqyy.com/jibing/xhnk/131009/4c363.html';
//var path = 'html body div div';//table tbody tr td table#table2 tbody tr td html body div div
//var s = $(path).attr('style', 'color:#333;').text();

var xuefo='http://www.xuefo.net/nr/article20/198170.html';

var gate = 'http://gate.baidu.com/tc?bd_page_type=1&src=';
var url = gate + xuefo;

// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters, an error, response status code and the html

request(url, function (error, response, html) {

    // First we'll check to make sure no errors occurred when making the request

    if (!error) {
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
        var dowork = function (err, html1) {
            //console.log(html1);
            var $ = cheerio.load(html1);
            var path = 'html body div div div.c1 div.c2';//table tbody tr td table#table2 tbody tr td html body div div
            var s = $(path).text();
            console.log(s);
//            $(path).each(function(i, elem) {
//                console.log('aaaaaaaaaaaaaa');
//                var s=$(this).text();
//                console.log(s);
//            });
        };
        tidy(html, dowork);


        // Finally, we'll define the variables we're going to capture

        //var title, release, rating;
        //var json = { title : "", release : "", rating : ""};
    }
});