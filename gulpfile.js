var gulp = require('gulp');
const del = require("del");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require("gulp-typescript");
const tsProject = tsc.createProject("tsconfig.json");
var tslint = require('gulp-tslint');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var Builder = require('systemjs-builder');





/**
 * Compile SASS and create css .
 */

var sassFolder = './client/sass/**/*.scss';
var tsFolder = './client/ts/**/*.ts';
var output = './client';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
gulp.task('sass', function () {
    return gulp
        .src(sassFolder)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write('./sass/maps'))
        .pipe(gulp.dest(output));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("./client/app/ts/**/*.ts")
                    .pipe(tslint({
                        formatter: "verbose"
                    }))
                    .pipe(tslint.report({
                        emitError: false
                    }))
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ['tslint'],() => {
    var tsResult = gulp.src(["./client/app/ts/**/*.ts", "typings/**/*.d.ts"])
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        //.pipe(sourcemaps.write(".", {sourceRoot: './client/js/map'}))
        .pipe(gulp.dest("./client/app/js"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
       .pipe(gulp.dest("client/lib"));
});

gulp.task('watch', function() {
    // Watch the input folder for change,
    // and run `sass` task when something happens
    gulp.watch(sassFolder, ['sass'])
            // When there is a change,
            // log a message in the console
            .on('change', function(event) {
                console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
    gulp.watch(["./client/app/ts/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});




gulp.task('vendor-bundle', function() {
	gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/reflect-metadata/Reflect.js',
            'client/system.config.js'
        ])//, {cwd: "node_modules/**"}
		.pipe(concat('vendors.min.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest('./dist.prod'));
});


// gulp.task('html-replace',[ 'app-bundle', 'vendor-bundle' ], function() {
//   gulp.src('index.html')
//     .pipe(htmlreplace({
//         'vendor': 'vendors.min.js',
//         'app': 'app.min.js'
//     }))
//     .pipe(gulp.dest('dist'));
// });
/**
 * Build the project.
 */
gulp.task("build", ['libs', 'compile', 'sass'], () => {
    console.log("Building the project ...");
});

// Generate systemjs-based builds
gulp.task('bundle-app', function() {
  var builder = new Builder('', './client/systemjs.config.js');
  return builder
            .bundle('[dist.prod/client/app/js/**/*]', 'dist/app-prod.min.js')
            .then(function() {
                console.log('Build complete');
             })
            .catch(function(err) {
                console.log('Build error');
                console.log(err);
            });
});
gulp.task('bundle-dependencies', function() {

  var builder = new Builder('', './client/systemjs.config.js');
  return builder
      .bundle('dist.prod/client/**/* - [dist.prod/client/app/**/*.js]', 'dist.prod/dependencies.bundle.min.js', {
          minify: true,
          mangle: true
      })
      .then(function() {
          console.log('Build complete');
      })
      .catch(function(err) {
          console.log('Build error');
          console.log(err);
      });

  });


/**
 * Build poject for production 
 */
/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["dist.prod"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources.client", () => {
    return gulp.src(["./client/**/*", "!**/*.ts", "!**/*.scss"])
        .pipe(gulp.dest("./dist.prod/client"));
});

gulp.task("build.prod", () => {
    runSequence('clean', 'build', ['resources.client']);
});



