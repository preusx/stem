var fs = require('fs');
var path = require('path');
var extend = require('extend');

var config = require('../config.js');

module.exports = function (optionsUser) {
  var sweet = require('sweet.js');
  var through = require('through');
  var sourceMap = require('convert-source-map');

  var pt = path.normalize(__dirname + '../../../');
  optionsUser = optionsUser || {};

  // Receiving list of macro modules.
  var modulesNamesList = optionsUser.modulesList || [],
      modulesList = [];

  delete optionsUser.modulesList;

  if (
        typeof modulesNamesList === 'string' &&
        /\.json$/img.test(modulesNamesList)
      ) {
    modulesNamesList = require(
        path.normalize(pt + './' + modulesNamesList)
      ).files || [];
  }

  // Loading macros.
  for (var i = 0, l = modulesNamesList.length; i < l; i++) {
    modulesList = modulesList.concat(sweet.loadModule(fs.readFileSync(
      path.normalize(pt + './' + modulesNamesList[i]), 'utf8'
    )));
  }

  return function (file) {
    var data = '';
    return through(write, end);

    function write (buf) { data += buf }
    function end () {
      var r, options = {
        sourceMap:     true,
        filename:      file,
        readableNames: true,
        modules: [],
      };

      extend(options, optionsUser);
      extend(options.modules, modulesList);

      try {
        r = sweet.compile(data, options);
      } catch(e) {
        return this.emit('error', e);
      }

      if(options.sourceMap) {
        var map = sourceMap.fromJSON(r.sourceMap);
        map.sourcemap.sourcesContent = [data];

        this.queue(r.code + '\n' + map.toComment());
      } else {
        this.queue(r.code);
      }

      this.queue(null);
    }
  };
};