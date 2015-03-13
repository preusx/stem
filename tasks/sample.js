var config = require('./config.js');
var gulp   = require('gulp');

var paths = {
  base        : [config.folder.dev + config.folder.],
  source      : config.folder.dev + config.folder. + ,
  destination : config.folder.dist + config.folder.,
};


var watch  = '';


var dev    = function() {};


var build  = dev; // function() {};



/**
 * Export
 * ======================================================================== */

module.exports = {
  watch: watch,
  dev:   dev,
  build: build,
};