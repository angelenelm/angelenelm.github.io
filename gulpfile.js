var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function() {
  return gulp
    .src('sass/**/*.scss')

    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))

    .pipe(sass({
      outputStyle: 'compressed'
    }))

    .pipe(gulp.dest('css'))
})
