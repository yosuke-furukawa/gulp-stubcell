var assert = require('power-assert');
var http = require('http');
var fs = require('fs');
var gstubcell = require('../index');
describe('test http request', function () {
  var server;
  beforeEach(function(done) {
    server = gstubcell.start({
      entry : 'test/fixtures/entry.yaml',
      basepath : 'test/base',
      debug: true
    });
    server.on("listening", done);
  });
  afterEach(function(done) {
    server.on("close", done);
    server.close();
  });
  it('should set basepath', function (done) {
    http.get("http://127.0.0.1:3000/base/hello", function(res) {
      assert.equal(res.statusCode, 200);
      var data = "";
      res.on("data", function(d){
        data += d;
      });
      res.on("end", function() {
        console.log(data);
        var jsonData = JSON.parse(data);
        assert.equal(jsonData.hello, "world");
        done();
      });
    });
  });
});
