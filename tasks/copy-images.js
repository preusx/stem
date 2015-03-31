var gulp   = require('gulp');

var config = require('./config');
var CopyTask = require('./copy');

module.exports = CopyTask.extend({
  paths: {
    source: config.folder.dev + config.folder.img + '**/*.{png,jpg,gif,svg}',
    dest:   config.folder.dist + config.folder.img,
  },

  watch: config.folder.dev + config.folder.img + '**/*.{png,jpg,gif,svg}',
});