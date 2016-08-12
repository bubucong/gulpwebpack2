/**
 * Created by lsc on 2016/8/10.
 */
var gulp = require('gulp');
var webpack = require('webpack-stream');
var gulpSequence = require('gulp-sequence');
var cleanCSS = require('gulp-clean-css');
var uglifyJS = require('gulp-uglify');

gulp.task("pack",function(){
    return gulp.src('src/**/*.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
});
gulp.task("uglifyJS",function(){
    return gulp.src('dist/**/*.js')
        .pipe(uglifyJS())
        .pipe(gulp.dest('dist_mini'));
});
gulp.task("minifyCSS",function(){
    return gulp.src('src/common/styles/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist_mini/common/styles'));
});
gulp.task("sequence",gulpSequence(['pack','minifyCSS'],'uglifyJS'));

gulp.task('default', function() {
    gulp.start("sequence");
});
