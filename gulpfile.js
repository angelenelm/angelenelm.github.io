var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    cp = require('child_process'),
    jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

/* run 'jekyll build' */
gulp.task('jekyll-build', done => {
    return cp.spawn(jekyll, ['build'], { stdio: 'inherit' }).on('close', done);
})

/* rebuild jekyll then reload the page */
gulp.task('jekyll-rebuild', gulp.series(['jekyll-build', reload]))

/* wait for jekyll-build, then launch server */
gulp.task('serve', gulp.series('jekyll-build'), () => {
  browserSync({
    server: {
      baseDir: '_site'
    },
    host: 'localhost'
  })
})

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
  gulp.watch('scss/*.scss', gulp.series(['sass', reload]));
  gulp.watch('sass/**/*.scss', gulp.series(['sass', reload]));
})

gulp.task('default', gulp.series('serve', 'sass', 'watch'));
