var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');



gulp.task('sass', () => {
  return gulp
    .src('sass/**/*.scss')

    .on('error', sass.logError)

    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))

    .pipe(sass({
      outputStyle: 'compressed'
    }))

    .pipe(gulp.dest('css'))
})

gulp.task('watch', () => {
  gulp.watch('sass/**/*.scss', gulp.series(['sass', reload]));
})

gulp.task('default', gulp.series('serve', 'sass', 'watch'));
