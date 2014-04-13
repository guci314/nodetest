/**
 * Created by Administrator on 14-4-13.
 */

var databaseUrl = 'jkfs'; // "username:password@example.com/mydb"
var collections = ["pages"]
var db = require("mongojs").connect(databaseUrl, collections);

var count=0;

db.pages.find({},function(err, docs) {
    docs.forEach(function (doc){
        doc.title=doc.title.trim();
        doc.txt=doc.txt.trim();
        db.pages.save(doc);
        console.log(doc.title);
        console.log(doc.category);
//        if (doc.title.indexOf('净空法师') != -1){
//            doc.category="净空法师";
//            db.pages.save(doc);
//        }
//        if (doc.title.indexOf('常善法师') != -1){
//            doc.category="常善法师";
//            db.pages.save(doc);
//        }
//        if (doc.title.indexOf('印光大师') != -1){
//            doc.category="印光大师";
//            db.pages.save(doc);
//        }
        count=count+1;
        console.log("count:"+count);
    });
});