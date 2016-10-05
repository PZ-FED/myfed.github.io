
// npm install gulp-sass gulp-autoprefixer gulp-clean-css gulp-uglify gulp-imagemin gulp-rename gulp-clean gulp-concat gulp-notify gulp-cache gulp-livereload gulp-htmlmin gulp-sourcemaps

// project directories
var path = {
    src: {
        html: 'html/**/*.html',
        styles: 'scss/**/*.scss',
        scripts: 'scripts/**/*.js',
        images: 'images/**/*',
    },
    dest: {
        html: '../',
        styles: '../css/',
        scripts: '../js/',
        images: '../images/',
    }
};

// Load plugins

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    htmlmin = require('gulp-htmlmin'),
    sourcemaps = require('gulp-sourcemaps');

// html
gulp.task('html', function() {
    return gulp.src(path.src.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.dest.html));
});

// Styles
gulp.task('styles', function () {
    return gulp.src(path.src.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('style.css'))
        // .pipe(gulp.dest(path.dest.styles)) // produce unminified css file
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dest.styles))
        .pipe(notify({message: 'Styles task complete'}));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src(path.src.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        //.pipe(gulp.dest(path.dest.scripts)) // produce unminified javascript file
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dest.scripts))
        .pipe(notify({message: 'Scripts task complete'}));
});

// Images
gulp.task('images', function () {
    return gulp.src(path.src.images)
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest(path.dest.images))
        .pipe(notify({message: 'Images task complete'}));
});

// Clean
gulp.task('clean', function () {
    return gulp.src([path.dest.styles, path.dest.scripts, path.dest.images], {read: false})
        .pipe(clean({force: true}));
});

// Default task
gulp.task('default', ['clean'], function () {
    gulp.run('html','styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function () {

    // Watch .html files
    gulp.watch(path.src.html, function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('html');
    });
    // Watch .scss files
    gulp.watch(path.src.styles, function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('styles');
    });

    // Watch .js files
    gulp.watch(path.src.scripts, function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('scripts');
    });

    // Watch image files
    gulp.watch(path.src.images, function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('images');
    });


});