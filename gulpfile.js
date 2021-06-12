var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    cp = require('child_process'),

    jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

var scssPath = '_scss/**/*.scss';
var scssMainPath = '_scss/*.scss';
var templatePath = [
  '*.html',
  '_includes/*.html',
  '_layouts/*.html',
  '*.yml',
  '*.js'
];

gulp.task('sass', () => {
  return gulp
  .src(scssMainPath)
  .pipe(sass({
    includePaths: ['scss'],
    outputStyle: 'expanded',
  }))
  .pipe(prefix({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false,
  }))
  .pipe(cleancss({compatibility: 'ie8'}))
  .pipe(gulp.dest('_site/css'))
  .pipe(gulp.dest('css'))
})

// browserSync tasks
var reloadBrowser = done => {
  browserSync.reload();
  done();
}

// run `jekyll build`
gulp.task('jekyll-build', done => {
  return cp
  .spawn(jekyll, ['build'], {stdio: 'inherit'}).on('close', done)
})

// run `jekyll build` with _config_dev.yml
gulp.task('jekyll-dev', done => {
  return cp
  .spawn(jekyll, ['build', '--config', '_config.yml,_config_dev.yml'], {
    stdio: 'inherit',
  })
  .on('close', done)
})

// rebuild jekyll then page reload
gulp.task('jekyll-rebuild', gulp.series(['jekyll-dev', reloadBrowser]))

gulp.task('serve', gulp.series('jekyll-dev', () => {
    browserSync.init({
      server: {
        baseDir: '_site',
      }
    })

    gulp.watch(scssPath, gulp.series(['sass', reloadBrowser]))
    gulp.watch(templatePath, gulp.task('jekyll-rebuild'))
  }
))

gulp.task('build', gulp.series(['sass', 'jekyll-build']))
