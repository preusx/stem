var config = require('./tasks/config.js');
var gulp  = require('gulp');
var watch = require('gulp-watch');


/**
 * Tasks
 * ======================================================================== */

var tasks = {};
var taskNames = [
  'scripts',
  'styles',
  'templates',
  'copy-vendor',
  'copy-images',
  'copy-fonts',
];

/**
 * Loading tasks
 */
for(var i = 0, l = taskNames.length; i < l; i++) {
  var taskName = taskNames[i];
  var task = tasks[taskName] = require('./tasks/' + taskName + '.js');

  gulp.task(taskName + ':dev', task.dev);
  gulp.task(taskName + ':build', task.build);
}

/**
 * Additive tasks.
 */
gulp.task('watch', function(){
  console.log('I\'m watching...');

  config.WATCHING = true;

  for(var i in tasks) {
    if(!tasks.hasOwnProperty(i)) continue;

    var task = tasks[i];

    if(task.watch) {
      watch(task.watch, (function(taskName) {
        return function() {
          gulp.start(taskName + ':dev');
        };
      })(i));
    }
  }
});

gulp.task('copy', [
    'copy-vendor:dev',
    'copy-images:dev',
    'copy-fonts:dev',
  ]);

gulp.task('dist', [
    'scripts:build',
    'styles:build',
    'templates:build',
    'copy',
  ]);

gulp.task('build', ['dist']);

gulp.task('default', []);