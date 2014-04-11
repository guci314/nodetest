/**
 * Created by Administrator on 14-4-11.
 */
var Crawler = require("simplecrawler");

var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["links"]
var db = require("mongojs").connect(databaseUrl, collections);
db.links.drop();

Crawler.crawl("http://www.xuefo.net")
    .on("fetchcomplete",function(queueItem){
        console.log("Completed fetching resource:",queueItem.url);
        var l={};
        l.site='www.xuefo.net';
        l.link=queueItem.url;
        db.links.save(l);
    }
);
//Crawler.crawl("http://www.xuefo.net").on("fetchcomplete", function (queueItem, responseBuffer, response) {
//        console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.toString());
//        console.log("It was a resource of type %s", response.headers['content-type']);
//
//        // Do something with the data in responseBuffer
//    }
//)
//;
