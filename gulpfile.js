var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    args        = require('yargs').argv,
    shell       = require('gulp-shell'),
    size        = require('gulp-size'),
    gulpif      = require('gulp-if'),
    sourcemaps  = require('gulp-sourcemaps'),
    uncss       = require('gulp-uncss'),
    cssnano     = require('gulp-cssnano'),
    browserSync = require('browser-sync').create(),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rimraf      = require('rimraf');

var DIR = {},
    env = args.prod ? 'prod' : 'dev';

DIR.src       = 'source';
DIR.dest      = 'public_'+env;
DIR.fontsSrc  = DIR.src+'/fonts';
DIR.fontsDest = DIR.dest+'/fonts';
DIR.sassSrc   = DIR.src+'/_sass/';
DIR.cssDest   = DIR.dest+'/css';
DIR.jsSrc     = DIR.src+'/js';
DIR.jsDest    = DIR.dest+'/js';

gulp.task('default', ['build', 'watch']);

gulp.task('build', ['build-page', 'build-css', 'build-fonts'], function () {
    process.exit(0);
});

gulp.task('clean', function (cb) {
    rimraf('public_dev', cb);
});

gulp.task('watch', function () {
    browserSync.init({server: {baseDir: 'public_'+env}});

    gulp.watch(DIR.sassSrc+'/**/*.scss', ['build-css']);
    gulp.watch(DIR.imgSrc+'/**/*.{jpg,jpeg,png,gif,svg}', ['build-img']);
    gulp.watch([DIR.src+'/**/*.{html,html.twig,md}', DIR.fontsSrc+'/*', DIR.imgSrc+'/**'], ['watch-page']);
});

// This task is required as a hack to reload the browser AFTER Sculpin is finished building the page
gulp.task('watch-page', ['build-page'], browserSync.reload);

// Compiles SCSS into CSS, minifies it and moves it into correct directory.
gulp.task('build-css', function () {
    return gulp
        .src(DIR.sassSrc+'/**/*.scss')
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpif(env === 'prod', uncss({
            html:   [DIR.dest+'/**/*.html'],
            ignore: [/\hljs-[A-Za-z0-9-]+/, '.hljs']
        })))
        .pipe(gulpif(env === 'prod', cssnano()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(gulp.dest(DIR.cssDest))
        .pipe(browserSync.stream())
        .pipe(size({title: 'CSS'}));
});

gulp.task('build-fonts', function () {
    return gulp
        .src(DIR.fontsSrc+'/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest(DIR.fontsDest))
        .pipe(size({title: 'Fonts'}));
});

// Runs Sculpin to build the page
gulp.task('build-page', function () {
    return gulp.src('')
        .pipe(shell(['./vendor/bin/sculpin generate --env='+env], {quiet: true}));
});
