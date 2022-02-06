import browserSync from 'browser-sync'
import del from 'del'
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import pug from 'gulp-pug'
import merge from 'merge-stream'


function createServer() {
  const params = {
    watch: true,
    reloadDebounce: 150,
    notify: true,
    server: {
      baseDir: './build'
    }
  }

  browserSync.create().init(params)
}

function clearBuild() {
  return del('build/')
}

function buildPages() {
  return gulp.src('src/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/'))
}

function minImages() {
  return gulp.src('src/images/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images/'))
}

function copyFavicon() {
  return gulp.src('src/favicon/**/*.*')
    .pipe(gulp.dest('build/favicon'))
}

function copyBootstrap() {
  return merge([
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('build/vendor/css')),
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css.map')
    .pipe(gulp.dest('build/vendor/css')),
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
      .pipe(gulp.dest('build/vendor/js')),
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js.map')
      .pipe(gulp.dest('build/vendor/js'))
  ])
}

function copyFontAwesome() {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/js/all.min.js')
    .pipe(gulp.dest('build/vendor/js/fontawesome'))
}

function watchFiles() {
  gulp.watch('src/*.pug', buildPages)
  gulp.watch('src/images/**/*.*', minImages)
}

export default gulp.series(
  clearBuild,
  gulp.parallel(
    createServer,
    gulp.series(
      gulp.parallel(buildPages, minImages, copyFavicon, copyBootstrap, copyFontAwesome),
      watchFiles
    )
  )
)