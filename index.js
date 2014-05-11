var gutil = require('gulp-util');
var Stubcell = require('stubcell');

var defaults = {
  entry : "entry.yaml",
  basepath : "",
  port  : 3000,
  keepalive : false,
};

var server;
module.exports = {
  start : function(config) {
    var config = config || {};
    var stubcell = new Stubcell();
    var entry = config.entry || defaults.entry;
    var basepath = config.basepath || defaults.basepath;
    var port = config.port || defaults.port;
    var keepalive = config.keepalive || defaults.keepalive;

    stubcell.loadEntry(entry, basepath);
    stub = stubcell.server();
    server = stub.listen(port, function() {
      gutil.log(gutil.colors.green("Server started listening on " + port));
      gutil.log(gutil.colors.green("Entry file : " + entry));
    });
  },
  stop : function() {
    if (!server) throw new gutil.PluginError('gulp-stubcell', 'server is not started');
    server.close();
  }
};
