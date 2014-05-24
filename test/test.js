var expect = require('expect.js');
var http = require('http');
var fs = require('fs');
var gstubcell = require('../index');

describe('test http request', function () {
  it('should return 200 status code', function (done) {
    gstubcell.start({
      entry : 'test/fixtures/entry.yaml',
      record : {
        proxy : 'http://echo.jsontest.com'
      },
    });
    http.get("http://127.0.0.1:3000/test/abc", function(res) {
      expect(res.statusCode).to.equal(200);
      var data = "";
      res.on("data", function(d){
        data += d;
      });
      res.on("end", function() {
        var jsonData = JSON.parse(data);
        expect(jsonData.message).to.equal("Hello world");
        gstubcell.stop();
        done();
      });
    });
  });
  it('should record hello world', function (done) {
    gstubcell.start({
      entry : 'test/fixtures/entry.yaml',
      record : {
        proxy : 'http://echo.jsontest.com'
      },
    });
    http.get("http://127.0.0.1:3000/hello/world", function(res) {
      expect(res.statusCode).to.equal(200);
      var data = "";
      res.on("data", function(d){
        data += d;
      });
      res.on("end", function() {
        var jsonData = JSON.parse(data);
        expect(jsonData.hello).to.equal("world");
        fs.readFile("test/fixtures/hello/world.json", function(err, data) {
          expect(err).to.be(null);
          expect(JSON.parse(data).hello).to.equal("world");
          gstubcell.stop();
          done();
        });
      });
    });
  });
});
