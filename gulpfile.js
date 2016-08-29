'use strict';

//Main gulp pointer
var gulp = require('gulp');

//watch
var watch = require('gulp-watch');
var newer = require('gulp-newer');

//Plugins
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');
var copy = require('gulp-copy');

//LocalServer
var webserv = require('gulp-webserver');

var paths = {
    scripts: ['build/js/**.js'],
    images:  ['build/images{/,/**/}**.{jpg,gif,svg,png}'],
    html:    ['build/**.html', 'build/pages/**.html'], 
    less:    ['build/css/**.less', '!build/css/*.config.less']    
}

gulp.task('copy-html', function() {
    return gulp.src(paths.html, { base: 'build' })
               .pipe(newer('dist'))
               .pipe(gulp.dest('dist'))
               .on('error', outputError);
});

gulp.task('copy-images', function() {
    return gulp.src(paths.images, { base: 'build' })
               .pipe(newer('dist'))
               .pipe(gulp.dest('dist'))
               .on('error', outputError);
});

gulp.task('less', function() {
    return gulp.src(paths.less, { base: 'build' })
               .pipe(newer('dist'))
               .pipe(less())
               .pipe(gulp.dest('dist'))
               .on('error', outputError);
});

gulp.task('watch', function () {
    gulp.watch(paths.html, ['copy-html']);
    gulp.watch(paths.images, ['copy-images']);
});

gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserv({
            livereload: true,
            port: 8080,
            open: true
        }))
});

gulp.task('build', ['copy-html', 'copy-images', 'less']);

gulp.task('default', ['build', 'watch', 'webserver']);

function outputError (error) {
    console.log(error.toString());

    this.emit('end');
}