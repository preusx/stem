var gulp   = require('gulp');

var config = require('./config');
var CopyTask = require('./copy');

var VendorCopyTask = module.exports = CopyTask.extend({
  paths: {
    source: config.folder.dev + 'vendor/**/*.*',
    dest:   config.folder.dist + 'vendor/',
  },

  watch: config.folder.dev + 'vendor/**/*.*',
});