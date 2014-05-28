var gutil = require('gulp-util');
var Stubcell = require('stubcell');

var defaults = {
  entry : "entry.yaml",
  basepath : "",
  port  : 3000,
  keepalive : false,
  record : {},
  looseCompare : false,
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
    var record = config.record || defaults.record;
    var debug = config.debug || defaults.debug;
    var looseCompare = config.looseCompare || defaults.looseCompare;

    stubcell.loadEntry(entry, {
      basepath : basepath,
      record : record,
      debug : debug,
      looseCompare: looseCompare
    });
    stub = stubcell.server();
    server = stub.listen(port, function() {
      gutil.log(gutil.colors.green("Server started listening on " + port));
      gutil.log(gutil.colors.green("Entry file : " + entry));
    });
    return server;
  },
  stop : function() {
    if (!server) throw new gutil.PluginError('gulp-stubcell', 'server is not started');
    server.close();
  }
};
