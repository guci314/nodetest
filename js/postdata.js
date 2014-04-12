/**
 * Created by Administrator on 14-4-12.
 */
var http = require("http");
var data = {
    username: 'guci',
    passwd: "72101137748",
    option: "com_login",
    task: "login"
};

data = require('querystring').stringify(data);
console.log(data);
var opt = {
    method: "POST",
    host: "bzsm.org",
    port: 80,
    path: "/administrator/index.php",
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Content-Length": data.length
    }
};

var req = http.request(opt, function (serverFeedback) {
    if (serverFeedback.statusCode == 200) {
        var body = "";
        serverFeedback.on('data',function (data) {
            body += data;
        }).on('end', function () {
                res.send(200, body);
                console.log(body);
            });
    }
    else {
        console.log("error:"+serverFeedback.statusCode);
    }
});
req.write(data + "\n");
req.end();