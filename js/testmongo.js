/**
 * Created by Administrator on 14-4-11.
 */

var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users", "reports","links"]
var db = require("mongojs").connect(databaseUrl, collections);

db.links.drop();

exports.db=db;
//db.users.save({email: "guci@gmail.com", password: "iLoveMongo", sex: "male"}, function(err, saved) {
//    if( err) console.log("User not saved");
//    else {
//        console.log("User saved");
//        process.exit(0);
//    }
//});
