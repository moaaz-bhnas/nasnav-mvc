var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
const babel = require('gulp-babel');
 
gulp.task('scripts', function() {
  return gulp.src('./es6/code.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./es5'));
});

gulp.task('sass', function () {
  return gulp.src('./blocks/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./css'));
});

// Gulp watch syntax
gulp.task('watch', function(){
  gulp.watch('./**/*.scss', gulp.series('sass')),
  gulp.watch('./es6/code.js', gulp.series('scripts'));
  // Other watchers
});