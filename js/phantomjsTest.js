var casper = require('casper').create();

casper.start('http://www.google.com.hk', function() {
    this.echo(this.getTitle());
});

casper.thenOpen('http://www.java.com', function() {
    this.echo(this.getTitle());
});

casper.run();