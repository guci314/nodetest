/**
 * Created by Administrator on 14-4-13.
 */
var async = require('async');
var joomla = require('./joomla.js');
var databaseUrl = 'jkfs'; // "username:password@example.com/mydb"
var collections = ["pages"];
var db = require("mongojs").connect(databaseUrl, collections);

//var count = 0;
function postToJoomla(doc,cb){
    console.log('create article:'+doc.title);
    joomla.CreateArticle(11,doc.title,'',doc.txt,function(){cb()});
}
db.pages.find({category: '印光大师'}, function (err, docs) {
    if (err) return;
//    var documents=new Array();
//    docs.forEach(function(d){documents.push(d);});
    async.eachSeries(docs,postToJoomla,function(){
        console.log('finished');
        process.exit(0);
    });
//    docs.forEach(function (doc){
////        console.log(doc.title);
////        console.log(doc.category);
//        //joomla.CreateArticle(10,doc.title,'',doc.txt);
////        if (doc.title.indexOf('净空法师') != -1){
////            doc.category="净空法师";
////            db.pages.save(doc);
////        }
////        if (doc.title.indexOf('常善法师') != -1){
////            doc.category="常善法师";
////            db.pages.save(doc);
////        }
////        if (doc.title.indexOf('印光大师') != -1){
////            doc.category="印光大师";
////            db.pages.save(doc);
////        }
////        count=count+1;
////        console.log("count:"+count);
//    });
});