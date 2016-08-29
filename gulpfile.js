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


//Plugins
/*
var copy = require('gulp-copy');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');
var sync = require('gulp-files-sync');

//LocalWebserver
var webserver = require('gulp-webserver');

//Not in use
var watch = require('gulp-watch');
var cached = require('gulp-cached');
*/

//File Paths

//var less_files = ['build/css/**.less', '!build/css/*.config.less'];
//var html_files = ['build/**/**.html'];
//var js_files   = ['build/js/**.js'];
//var image_files = ['build/{images,img}/**/**.{jpg,gif,png,svg}'];
//var css_files = ['build/css/**.css', '!build/css/**.less'];

var paths = {
    scripts: ['build/js/**.js'],
    images:  ['build/images{/,/**/}**.{jpg,gif,svg,png}'],
    html:    {
        build: ['build/**.html', 'build/pages/**.html'],
        dest:  ['dist/{/,/pages/}**.html'] 
    },
    less:    ['build/css/**.less', '!build/css/*.config.less']    
}

/*
gulp.task('copy-css', function () {
    return gulp.src(css_files)
            .pipe(cached('bootstrap'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

gulp.task('copy-img', function () {
    return gulp.src(image_files)
            .pipe(cached('copy-img'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

gulp.task('copy-html', function () {
    return gulp.src(html_files)
            .pipe(cached('copy'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

gulp.task('copy-scripts', function () {
    return gulp.src(js_files)
            .pipe(cached('copy-scripts'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

gulp.task('less', function () {
    return gulp.src(less_files, { base: 'build' })
            .pipe(cached('less'))
            .pipe(less())
            .on('error', outputError)
            .pipe(gulp.dest('dist'));
});

gulp.task('cssmin', function () {
    return gulp.src(['dist/css/**.css', '!dist/css/**.min.css'], { base: 'dist' })
            .pipe(cached('cssmin'))
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min'}))
            .on('error', outputError)
            .pipe(gulp.dest('dist'));
});
*/

gulp.task('copy-html', function() {
    return gulp.src(paths.html.build)
               .pipe(newer(['dist/**.html', 'dist/pages/**.html']))
               .pipe(copy('dist', { prefix: 1 }))
               .on('error', outputError);
});

gulp.task('watch', function () {
    gulp.watch(paths.html.build, ['copy-html']);
    /*
    gulp.watch(less_files, ['less', 'cssmin']);
    gulp.watch(html_files, ['copy-html']);
    gulp.watch(image_files, ['copy-img']);
    gulp.watch(js_files, ['copy-scripts']);
    */
});

gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            port: 8080,
            open: true
        }))
});

//gulp.task('build', ['copy-html', 'copy-scripts', 'copy-css', 'less', 'cssmin', 'webserver', 'watch']);
//gulp.task('build', ['copy-html', 'copy-scripts', 'copy-css', 'less', 'cssmin', 'webserver', 'watch']);
//gulp.task('default', ['webserver', 'watch']);
gulp.task('default', ['watch']);

function outputError (error) {
    console.log(error.toString());

    this.emit('end');
}