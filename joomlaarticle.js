var terminal = require('child_process').spawn('cmd');

terminal.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

terminal.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

terminal.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});

setTimeout(function() {
    terminal.stdin.write('echo %PATH%');
}, 2000);