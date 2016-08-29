'use strict';

//Main gulp pointer
var gulp = require('gulp');

//watch
var newer = require('gulp-newer');
var del = require('del');

//Plugins
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');

//LocalServer
var webserv = require('gulp-webserver');

var paths = {
    scripts: ['build/js/**.js'],
    images:  ['build/images/**.{jpg,gif,svg,png}', 'build/images/**/**.{jpg,gif,svg,png}'],
    html:    ['build/**.html', 'build/pages/**.html', 'build/includes/**.html'], 
    less:    ['build/css/**.less', '!build/css/*.config.less'],
    css:     ['build/css/**.css', '!build/css/**.less']  
}

var base = { base: 'build' };
var dest = 'dist';

gulp.task('copy-html', function () {
    return gulp.src(paths.html, base)
               .pipe(newer(dest))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

gulp.task('copy-images', function (done) {
    return gulp.src(paths.images, base)
               .pipe(newer(dest))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

gulp.task('copy-scripts', function () {
    return gulp.src(paths.scripts, base)
               .pipe(newer(dest))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

gulp.task('copy-css', function () {
    return gulp.src(paths.css, base)
               .pipe(newer(dest))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

gulp.task('less', function () {
    return gulp.src(paths.less, base)
               .pipe(newer(dest))
               .pipe(less())               
               .pipe(gulp.dest(dest))
               .on('error', outputError)
               .pipe(cssmin())               
               .pipe(rename( { suffix: '.min' }))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

gulp.task('watch', function () {
    gulp.watch(paths.html, ['copy-html']);
    gulp.watch(paths.css, ['copy-css']);
    gulp.watch(paths.less, ['less']);    
    
    var watchImages = gulp.watch(paths.images, ['copy-images']);  

    watchImages.on('change', function (e) {
        if(e.type === 'deleted') {
            del(path.relative('./', e.path).replace('build', 'dist'));
        }
    }).on('error', outputError);
});

gulp.task('webserver', function () {
    gulp.src(dest)
        .pipe(webserv({
            livereload: true,
            port: 8080,
            open: true
        }))
});

gulp.task('build', ['copy-html', 'copy-images', 'copy-css', 'copy-scripts', 'less']);
gulp.task('dev', ['watch', 'webserver']);

gulp.task('default', ['build', 'watch', 'webserver']);

function outputError (error) {
    console.log(error.toString());
    this.emit('end');
}