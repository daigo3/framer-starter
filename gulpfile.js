var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('connect', function() {
    connect.server({
        root: ['./Project'],
        port: 8080,
        livereload: true
    });
});

var bundler = watchify(browserify({
    entries: ['./Project/src/app.js'],
    debug: true
}));

bundler.on('update', bundle);
bundler.on('log', gutil.log);
gulp.task('browserify', bundle);

function bundle() {
    return bundler
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./Project'))
        .pipe(connect.reload());
}

gulp.task('watch', function() {
    gulp.watch(options.assets + '/src/**/*.js', ['browserify']);
});

gulp.task('default', ['connect', 'browserify']);
