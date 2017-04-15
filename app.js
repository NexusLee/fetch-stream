var http = require('http');
var fs = require('fs');

var options = {
    host: address,
    port:port,
    path:'',
    method:'GET'
}

var writeStream = fs.createWriteStream('file.flv');

var passedLength = 0;
var lastSize = 0;
var startTime = Date.now();
var totalSize = 0;

var req = http.request(options, function(res){
    console.log('STATUS' + res.statusCode);

    //totalSize = res.headers['content-length'];

    res.on('data', function(chunk){
        show();
        passedLength += chunk.length;
        writeStream.write(chunk);
    })

    res.on('end', function(){
        writeStream.end();
    })
})


req.end();

var out = process.stdout;

function show() {
    var size = Math.ceil(passedLength / 1000000);
    var nowSize = passedLength / 1024;

    var diff = nowSize - lastSize;
    lastSize = nowSize;
    out.clearLine();
    out.cursorTo(0);
    var endTime = Date.now();
    out.write('已完成' + size + 'MB, 速度：' + diff + 'KB/s,共用时：' + (endTime - startTime) / 1000 + '秒。');
}