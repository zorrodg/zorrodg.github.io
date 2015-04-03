"use strict";

/**
 * Gulpfile!
 * @package zorro-portfolio
 * @author Andrés Zorro <zorrodg@gmail.com>
 */

// Project dependencies ========================
var gulp        = require("gulp"),
    browserSync = require("browser-sync"),
    browserify  = require("browserify"),
    watchify    = require("watchify"),
    reactify    = require("reactify"),
    babelify    = require("babelify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    gp          = require("gulp-load-plugins")({
      pattern: ["gulp-*", "gulp.*"],
      replaceString: /\bgulp[\-.]/
    }),

    // Config Variables
    _min       = gp.util.env.min ? ".min" : "",
    _paths     = require("./package.json").paths,
    sources = [
      "**/*.js",
      "**/*.jsx",
      "!node_modules/**/*",
      "!dist/**/*"
    ];


// Tasks =======================================
gulp.task("default", ["build:js:watch"], function () {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});
gulp.task("build", ["build:js"]);
gulp.task("build:js:watch", ["lint:js", "watch"], js(true));
gulp.task("build:js", ["lint:js"], js(false));
gulp.task("lint:js", lint());

gulp.task("watch", function () {
  return gulp.watch(sources, ["lint:js"]);
});

/**
 * Lints Javascript Files
 * @return {void} Gulp Pipe
 */
function lint() {

  return function () {
    return gulp.src(sources)
      .pipe(gp.jscs())
      .on("error", handleError)
      .pipe(gp.react())
      .pipe(gp.jshint())
      .pipe(gp.jshint.reporter("jshint-stylish"))
      .pipe(gp.jshint.reporter("fail"))
      .on("error", handleError);
  };

  function handleError(error) {
    gp.notify.onError({
      title: "Lint Error"
    })(error);
    process.kill(process.pid);
  }
}

/**
 * Bundles js with browserify
 * @param  {Boolean} watch True to activate Watchify
 * @return {void}          Gulp Pipe
 */
function js(watch) {
  var bundler = browserify({
    basedir: "./" + _paths.src.root,
    debug: watch
  });

  bundler.add("./" + _paths.src.js)
    .transform(reactify)
    .transform(babelify);

  if (watch) {
    bundler = watchify(bundler, watchify.args);
    bundler.on("update", rebundle);
  }

  return rebundle;

  function rebundle() {
    return bundler.bundle()
          .pipe(source("main" + _min + ".js"))
          .pipe(buffer())
          .pipe(_min ? gp.uglify() : gp.util.noop())
          .pipe(gulp.dest(_paths.dist.root))
          .pipe(browserSync.reload({stream: true}))
          .pipe(gp.notify({
            title: "JS",
            message: "Bundle success"
          }));
  }
}
