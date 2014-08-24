var assert = require('power-assert');
var http = require('http');
var fs = require('fs');
var gstubcell = require('../index');

describe('test http request', function () {
  var server;
  beforeEach(function(done) {
    server = gstubcell.start({
      entry : 'test/fixtures/entry.yaml',
      debug: true,
      record: {
        target: "http://echo.jsontest.com"
      }
    });
    server.on("listening", done);
  });
  afterEach(function(done) {
    server.on("close", done);
    server.close();
  });
  it('should return 200 status code', function (done) {
    http.get("http://127.0.0.1:3000/test/abc", function(res) {
      var data = "";
      res.on("data", function(d){
        data += d;
      });
      res.on("end", function() {
        var jsonData = JSON.parse(data);
        assert.equal(jsonData.message, "Hello world");
        done();
      });
    });
  });
  it('should record hello world', function (done) {
    http.get("http://127.0.0.1:3000/hello/world", function(res) {
      var data = "";
      res.on("data", function(d){
        data += d;
      });
      res.on("end", function() {
        var jsonData = JSON.parse(data);
        assert.equal(jsonData.hello, "world");
        fs.readFile("test/fixtures/hello/world_get.json", function(err, data) {
          assert.equal(err, null);
          assert.equal(JSON.parse(data).hello, "world");
          done();
        });
      });
    });
  });
});
