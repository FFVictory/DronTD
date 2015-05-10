var size = require('gulp-filesize');
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var complexity = require('gulp-complexity');


gulp.task('default',['clean' , 'complexity'],function(){

})

gulp.task('size' , function(){
    return gulp.src('./public/stylesheets/*.css')
    .pipe(gulp.dest('./dist/'))
    .pipe(size())
})
gulp.task('clean',['size'], function(){
    gulp.src('./dist/')
        .pipe(clean());
})
gulp.task('complexity', function(){
    return gulp.src('./public/javascripts/project/*.js')
        .pipe(complexity());
});