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
    html:    {
        build: ['build/**.html', 'build/pages/**.html'],
        dest:  ['dist/{/,/pages/}**.html'] 
    },
    less:    ['build/css/**.less', '!build/css/*.config.less']    
}

/*
gulp.task('copy-html', function () {
    return gulp.src(html_files)
            .pipe(cached('copy'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
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
});

gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            port: 8080,
            open: true
        }))
});

gulp.task('default', ['watch']);

function outputError (error) {
    console.log(error.toString());

    this.emit('end');
}