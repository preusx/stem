var gulp = require('gulp');
var extend = require('extend');

var Task = module.exports = {
  extend: function(object) {
    var newObject = {};

    newObject = extend(true, newObject, this, object);
    newObject.super = extend(true, {}, this);
    binder(newObject);

    return newObject;

    function binder(object) {
      var that = newObject;

      for(var i in object) {
        if(!object.hasOwnProperty(i)) continue;

        var thus = object[i];

        // Is function. Underscore code.
        if(!!(thus && thus.constructor && thus.call && thus.apply)) {
          object[i] = thus.bind(that);
        } else if(thus === Object(thus) &&
            Object.prototype.toString.call(thus) !== '[object Array]') {
          binder(thus);
        }
      }
    }
  },

  paths: {},
  watch: false,

  pipes: {
    dev: function(pipe) {
      return pipe;
    },

    build: function(pipe) {
      return this.pipes.dev(pipe);
    }
  },

  dev: function () {
    return this.pipes.dev(gulp.src(this.paths.source))
      .pipe(gulp.dest(this.paths.dest));
  },

  build: function () {
    return this.pipes.build(gulp.src(this.paths.source))
      .pipe(gulp.dest(this.paths.dest));
  }
};