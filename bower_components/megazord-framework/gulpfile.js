'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var path = require('path');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
    var filename = './src/megazord.js';
    var b = browserify({
        entries: filename,
        transform: [reactify]
    });

    return b.bundle()
        .pipe(source('megazord.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
});

