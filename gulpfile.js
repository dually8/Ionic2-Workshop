var gulp = require('gulp'),
  gulpWatch = require('gulp-watch'),
  del = require('del'),
  runSequence = require('run-sequence'),
  argv = process.argv;


/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
var buildBrowserify = require('ionic-gulp-browserify-typescript');
var buildSass = require('ionic-gulp-sass-build');
var copyHTML = require('ionic-gulp-html-copy');
var copyFonts = require('ionic-gulp-fonts-copy');
var copyScripts = require('ionic-gulp-scripts-copy');
var tslint = require('ionic-gulp-tslint');

var isRelease = argv.indexOf('--release') > -1;

gulp.task('watch', ['clean'], function (done) {
  runSequence(
    ['sass', 'html', 'fonts', 'scripts'],
    function () {
      gulpWatch('app/**/*.scss', function () { gulp.start('sass'); });
      gulpWatch('app/**/*.html', function () { gulp.start('html'); });
      buildBrowserify({ watch: true }).on('end', done);
    }
  );
});

gulp.task('build', ['clean'], function (done) {
  runSequence(
    ['sass', 'html', 'fonts', 'scripts'],
    function () {
      buildBrowserify({
        minify: isRelease,
        browserifyOptions: {
          debug: !isRelease
        },
        uglifyOptions: {
          mangle: false
        }
      }).on('end', done);
    }
  );
});

gulp.task('sass', buildSass);
gulp.task('html', copyHTML);
gulp.task('fonts', copyFonts);
gulp.task('scripts', ['copy-firebase'], copyScripts); // copy firebase over
gulp.task('clean', function () {
  return del('www/build');
});
gulp.task('lint', tslint);


// My Tasks

var sh = require('shelljs');

gulp.task('copy-firebase', function () {

  var fbSrc = [
    'node_modules/firebase/firebase.js'
  ];

  return gulp.src(fbSrc)
    .pipe(gulp.dest('www/build/js'));
});

// run jasmine unit tests using karma with PhantomJS2 in single run mode
gulp.task('karma', function (done) {

  var singleRun = argv.indexOf('--debug') === -1;
  console.log('is single run: ' + JSON.stringify(singleRun));
  var karma = require('karma');
  var karmaOpts = {
    configFile: '' + process.cwd() + '/test/karma.conf.js',
    singleRun: singleRun,
  };

  new karma.Server(karmaOpts, done).start();
});

// build unit tests, run unit tests, remap and report coverage
gulp.task('unit-test', function (done) {
  // console.log("CWD: " + process.cwd());
  runSequence(
    ['clean'], // Ionic's clean task, nukes the whole of www/build
    ['html'],
    'karma',
    done
  );
});

gulp.task('build-ios', function() {
  sh.exec('ionic build ios');
});

gulp.task('build-android', function() {
  sh.exec('ionic build android');
});

gulp.task('openXcode', function() {
  sh.exec('ionic build ios');
  sh.exec('open ./platforms/ios/*.xcodeproj');
});
