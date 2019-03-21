var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var concatCss   = require('gulp-concat-css');
var purify      = require('gulp-purifycss');
var concat      = require('gulp-concat');

/* start server */
gulp.task('start', ['concat'], function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch("dev/scss/*.scss",  ['sass']);
    gulp.watch("dev/scss/**/*.scss",  ['sass']);
    gulp.watch("dev/css/*.css", ['concat']);
    gulp.watch("dev/js/*.js", ['build-scripts']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("dev/js/*.js").on('change', browserSync.reload);
});

/* converting sass -> css */
gulp.task('sass', ['build-scripts'], function () {
    return gulp.src("dev/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dev/css"));
});

/* concat all css to one file*/
gulp.task('concat', ['sass'], function () {
    return gulp.src(['dev/css/normalize.css', 'dev/css/main.css'])
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.stream());
});

/* purify css */
gulp.task('build', function() {
    return gulp.src('app/css/bundle.css')
        .pipe(purify(['app/index.html'], { minify: true }))
        .pipe(gulp.dest('app/css/'));
});

/* concat js into one file */
gulp.task('build-scripts', function() {
    return gulp.src(['dev/js/jquery.min.js', 'dev/js/main.js' ])
        .pipe(concat({ path: 'bundle.js' }))
        .pipe(gulp.dest('app/js/'));
});


