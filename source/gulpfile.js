// project directories
var path = {
    src: {
        styles: 'scss/**/*.scss',
        scripts: 'scripts/**/*.js',
        images: 'images/**/*',
    },
    dest: {
        styles: '../css/',
        scripts: '../js/',
        images: '../img/',
    }
};

// Load plugins

var gulp = require('gulp'),
    sass = require('gulp-sass'),
// $ = require('gulp-load-plugins')();
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    // jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    sourcemaps = require('gulp-sourcemaps'),
    server = lr();

// var sassPaths = [
//     'node_modules/foundation-sites/scss',
//     'node_modules/motion-ui/src'
// ];


// Styles
gulp.task('styles', function () {
    return gulp.src(path.src.styles)
        .pipe(sourcemaps.init())
        // .pipe(sass({includePaths: sassPaths}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(path.dest.styles))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dest.styles))
        .pipe(notify({message: 'Styles task complete'}));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src(path.src.scripts)
        .pipe(sourcemaps.init())
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.dest.scripts))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dest.scripts))
        .pipe(notify({message: 'Scripts task complete'}));
});

// Images
gulp.task('images', function () {
    return gulp.src(path.src.images)
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(livereload(server))
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
    gulp.run('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function () {

    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err)
        }
        ;

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

});