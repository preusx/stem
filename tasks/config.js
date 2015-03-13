var path     = require('path');
var notifier = require('node-notifier');
var gutil    = require('gulp-util');

var DEBUG    = true,
    WATCHING = false;

var folder = {
  styl  : 'styl/',
  css   : 'css/',
  jade  : 'jade/',
  html  : 'html/',
  js    : 'js/',
  img   : 'img/',

  font  : 'font/',

  dev   : './dev/',
  dist  : './dist/',
};

/**
 * Utility functions.
 * ======================================================================== */

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

// Standard handler
function errorHandler(err){
  err.firstLine = err.message.split('\n')[0];

  if(!err.filename) {
    err.filename = err.firstLine.replace(/\:[0-9]+$/img, '');
  }

  if(!err.line) {
    if(!err.lineno) {
      err.line = err.firstLine.replace(/(.*)(\:([0-9]+))$/img, '$3');
    } else {
      err.line = err.lineno;
    }
  }

  var pathName = err.filename.replace(__dirname, '');
  var errorPosition = err.line + ':' + (err.column | '') + '::';
  var extName = path.extname(pathName);
  // Notification
  notifier.notify({
    title: extName.slice(1).capitalize() + ' (' + err.plugin + ') error:',
    message: errorPosition + pathName + "\n" + err.message,
    sound: true,
  });
  // Log to console
  gutil.log(gutil.colors.red('Error'), err.message);
}

// Handler for browserify
function errorHandlerBrowserify(err){
  errorHandler(err);
  // this.end();
}


/**
 * Export
 * ======================================================================== */

module.exports = {
  DEBUG:                  DEBUG,
  WATCHING:               WATCHING,
  folder:                 folder,
  errorHandler:           errorHandler,
  errorHandlerBrowserify: errorHandlerBrowserify,
  noop:                   require('gulp-util/lib/noop'),
};