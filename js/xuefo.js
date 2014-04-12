/**
 * Created by Administrator on 14-4-11.
 */

/**
 * Created by Administrator on 14-4-11.
 */
var fs = require('node-fs'),
    url = require('url'),
    wrench = require('wrench'),
    Crawler = require("simplecrawler").Crawler;

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["xuefo"]
var db = require("mongojs").connect(databaseUrl, collections);

db.xuefo.drop();

/**
 * @param String. Domain to download.
 * @Param Function. Callback when crawl is complete.
 */
var downloadSite = function (domain, callback) {

    // Where to save downloaded data
    var outputDirectory = "D:/webdata" + '/' + domain;
    var myCrawler = new Crawler(domain);
    myCrawler.interval = 250;
    myCrawler.maxConcurrency = 5;

    myCrawler.on("fetchcomplete", function (queueItem, responseBuffer, response) {
        if (queueItem.url.indexOf('.html') != -1) {
            var s =responseBuffer.toString(); //iconv.decode(responseBuffer, 'utf8');
            console.log(queueItem.url);
            var l={};
            l.url=queueItem.url;
            l.content=s;
            db.xuefo.save(l);
        }
//        {
//            // Parse url
//            var parsed = url.parse(queueItem.url)
//
//            // Rename / to index.html
//            if (parsed.pathname === '/')
//                parsed.pathname = '/index.html'
//
//            // Get directory name in order to create any nested dirs
//            var dirname = outputDirectory + parsed.pathname.replace(/\/[^\/]+$/, '')
//
//            // Path to save file
//            var filepath = outputDirectory + parsed.pathname
//
//            // Check if DIR exists
//            fs.exists(dirname, function (exists) {
//
//                // If DIR exists, write file
//                if (exists) {
//                    //fs.writeFile(filepath, responseBuffer, function () {});
//                    var s = iconv.decode(responseBuffer, 'gb2312');
//                    console.log(s);
//                }
//                // Else, recursively create dir using node-fs, then write file
//                else
//                    fs.mkdir(dirname, 0755, true, function (err) {
//                        //fs.writeFile(filepath, responseBuffer, function () {});
//                        var s = iconv.decode(responseBuffer, 'gb2312');
//                        console.log(s);
//                    })
//
//            })
//
//            console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length)
//            console.log("It was a resource of type %s", response.headers['content-type'])
//        }
    })

    // Fire callback
    myCrawler.on('complete', function () {
        callback()
    })

    // Start Crawl
    myCrawler.start()

}

//if (process.argv.length < 3) {
//    console.log('Usage: node downloadSiteExample.js mysite.com')
//    process.exit(1)
//}
downloadSite("www.xuefo.net", function () {
    console.log('Done!')
})