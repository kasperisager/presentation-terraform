const gulp = require('gulp');
const plumber = require('gulp-plumber');
const {compile} = require('gulp-nunjucks');
const htmlmin = require('gulp-htmlmin');
const webserver = require('gulp-webserver');

const {src, dest} = gulp;

gulp.task('html', () => src('src/html/*.html')
  .pipe(plumber())
  .pipe(compile())
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(dest('dist'))
);

gulp.task('img', () => src('src/img/**')
  .pipe(dest('dist/img'))
);

gulp.task('build', [
  'html',
  'img'
]);

gulp.task('watch', ['build'], () => {
  gulp.watch('src/html/**/*.html', ['html']);
  gulp.watch('src/img/**', ['img']);
});

gulp.task('serve', ['watch'], () => src('dist')
  .pipe(webserver())
);
