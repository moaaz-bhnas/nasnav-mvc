var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
 
gulp.task('scripts', function() {
  return gulp.src('./blocks/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
  return gulp.src('./blocks/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// gulp.task('css', function() {
//   return gulp.src('./blocks/**/*.scss')
//     .pipe(concat('styles.scss'))
//     .pipe(gulp.dest('./'));
// });

// Gulp watch syntax
gulp.task('watch', function(){
    gulp.watch('./blocks/**/*.scss', gulp.series('sass')); 
    // Other watchers
  })