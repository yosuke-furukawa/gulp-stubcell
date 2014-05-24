gulp-stubcell [![build status](https://secure.travis-ci.org/yosuke-furukawa/gulp-stubcell.png)](http://travis-ci.org/yosuke-furukawa/gulp-stubcell)
--------------------------

stubcell for gulp

## Install

```
npm install gulp-stubcell -D
```


## Usage

### simple
```js
var gulp = require('gulp'),
  stubcell = require('gulp-stubcell');

gulp.task('stubcell', function() {
  stubcell.start({
    // entry yaml path, default is entry.yml
    entry: 'entry.yml',
    // dummy response base dir
    basepath : '',
    // stubcell port
    port: 3000,
    // show more info
    debug: false,
    // recording settings
    record : {
      // request delegate to
      proxy : 'http://localhost:3001',
    }
  });
});

gulp.task('default', ['stubcell']);
```

### with connect
```js
var gulp = require('gulp');
var stubcell = require('gulp-stubcell');
var connect = require('gulp-connect');
var proxy = require('proxy-middleware');
var url = require('url');

gulp.task('connect', function() {
  connect.server({
    root: ['build'],
    port: 9000,
    livereload: true,
    middleware: function(connect, o) {
        return [ (function() {
            var options = url.parse('http://localhost:3000/test');
            options.route = '/test';
            return proxy(options);
        })() ];
    }
  });
});

gulp.task('stubcell', function() {
  stubcell.start({
    // entry yaml path, default is entry.yml
    entry: 'entry.yml',
    // dummy response base dir
    basepath : '',
    // stubcell port
    port: 3000,
    // recording settings
    record : {
      // request delegate to
      proxy : 'http://localhost:3001',
    }
  });
});

gulp.task('default', ['connect', 'stubcell']);

gulp.task('default', ['start']);
```
