var gulp   = require('gulp');

var config = require('./config');
var CopyTask = require('./copy');

module.exports = CopyTask.extend({
  paths: {
    source: config.folder.dev + config.folder.font + '**/*.{eot,otf,svg,ttf,woff}',
    dest:   config.folder.dist + config.folder.font,
  },

  watch: config.folder.dev + config.folder.font + '**/*.{eot,otf,svg,ttf,woff}',
});