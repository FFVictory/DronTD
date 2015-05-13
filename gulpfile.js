var size = require('gulp-filesize');
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var complexity = require('gulp-complexity');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;
var jshint = require('gulp-jshint');

gulp.task('default',['clean' , 'complexity' , 'compress','browser-sync' , 'lint' , 'watch'],function(){

});
gulp.task('lint', function(){
    gulp.src('./public/javascripts/**.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('size' , function(){
    return gulp.src('./public/stylesheets/*.css')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/'))
    .pipe(size())
    .pipe(plumber.stop())
});
gulp.task('clean',['size'], function(){
    gulp.src('./dist/')
        .pipe(plumber())
        .pipe(clean())
        .pipe(plumber.stop())
});
gulp.task('complexity', function(){
    return gulp.src('./public/javascripts/project/*.js')
        .pipe(plumber())
        .pipe(complexity())
        .pipe(plumber.stop());
});
gulp.task('compress', function() {
    return gulp.src('./public/javascripts/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(plumber.stop());
});
gulp.task('browser-sync', function() {
    browserSync.init(['./public/**/**.***'],{
        port : 7000,
        proxy : "http://localhost:3000"

    });
});
gulp.task('watch' , function(){
    gulp.watch(['./public/javascripts/*.js'],['lint']);
});
gulp.task('nodemon', function(cb){
    return nodemon({
        script : 'app.js'

    }).on('start' , function(){
        cb();
    })
});
