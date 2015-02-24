/**
 * Gulpfile!
 * @package zorro-portfolio
 * @author Andrés Zorro <zorrodg@gmail.com>
 */

// Project dependencies
var gulp       = require('gulp'),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    reactify   = require('reactify'),
    babelify   = require('babelify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    gp         = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'gulp.*'],
      replaceString: /\bgulp[\-.]/
    }),

    // Config Variables
    _min       = gp.util.env.min ? '.min' : '',
    _paths     = require('./package.json').paths;


gulp.task('default', [
  'build:js:watch'
  ]);

gulp.task('build', [
  'build:js'
  ]);

gulp.task('build:js:watch', js(true));
gulp.task('build:js', js(false));

function js (watch) {
  var bundler = browserify({
    basedir: './' + _paths.src.root,
    debug: watch
  });

  bundler.add('./' + _paths.src.js)
    .transform(reactify)
    .transform(babelify);

  if(watch){
    bundler = watchify(bundler, watchify.args);
    bundler.on('update', rebundle);
  }

  return rebundle;

  function rebundle () {
    return bundler.bundle()
          .pipe(source('main' + _min + '.js'))
          .pipe(buffer())
          .pipe(gp.jshint())
          .pipe(_min ? plugins.uglify() : gp.util.noop())
          .pipe(gulp.dest(_paths.dist.root))
          .pipe(gp.notify({
            title: 'JS',
            message: 'Bundle success'
          }));
  }
}