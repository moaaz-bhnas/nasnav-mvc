var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
const babel = require('gulp-babel');
 
gulp.task('scripts', function() {
  return gulp.src('./blocks/**/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./js'));
});

gulp.task('sass', function () {
  return gulp.src('./blocks/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('js:watch', function () {
  gulp.watch('./blocks/**/*.js', gulp.series('scripts'));
});

// Gulp watch syntax
gulp.task('watch', function(){
    gulp.watch('./blocks/**/*.scss', gulp.series('sass')),
    gulp.watch('./blocks/**/*.js', gulp.series('scripts'));
    // Other watchers
  })