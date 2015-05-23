var gulp = require('gulp'),
  sass = require('gulp-sass'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  livereload = require('gulp-livereload'),
  plumber = require('gulp-plumber'),
  argv = require('yargs').argv,
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  reactify = require('reactify'),
  watchify = require('watchify'),
  uglifyify = require('uglifyify'),
  prettyMs = require('pretty-ms'),
  exec = require('child_process').exec;

var building;

gulp.task('restart', function () {
  exec('docker-compose kill && docker-compose start', function (err, stdout, stderr) {
    console.log('restarted app');
  });
});

gulp.task('css', function () {
  var stream = gulp.src('./public/css/*.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./public/css'));
    if(!building) stream.pipe(livereload());
  return stream;
});

gulp.task('less', function () {
  return gulp.src('public/css/includes/code/index.less')
    .pipe(less())
    .pipe(rename('_code.scss'))
    .pipe(gulp.dest('public/css/includes'));
});

gulp.task('browserify', function () {
  var bundler = browserify({
      basedir: __dirname,
      debug: false,
      entries: './node_modules/_client',
      cache: {},
      packageCache: {},
      fullPaths: false
    });
  
  bundler = watchify(bundler)
    .transform(reactify)
    .transform({global: true}, uglifyify);

  var rebundle = function () {
    return bundler.bundle()
      .on('error', function (err) {
        console.log('Bundle Error', err.message);
        this.end();
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/js'))
      .on('end', function () {
        if(building) bundler.close();
      });
      if(!building) bundler.pipe(livereload());
  };
  bundler.on('update', function (ids) {
    console.log('Rebundling ' + ids.length + ' bundles');
    rebundle();
  }).on('time', function (time) {
    console.log('Bundler finished in ' + prettyMs(time));
  });
  return rebundle();
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch([
    'public/css/*.scss',
    'public/css/includes/*.scss'
  ], {interval: 500}, ['css']);
  gulp.watch([
    'public/css/includes/code/**/*.less'
  ], {interval: 500}, ['less', 'css']);
  gulp.watch(['./src/routes.jsx'], {interval: 500}, ['restart']);
  gulp.watch(['**/**.js'], {interval: 500}, function (e) {
    console.log('change', e.path);
    exec('docker-compose kill && docker-compose start', function (err, stdout, stderr) {
      console.log('restarted app');
      setTimeout(function () {
        livereload.changed(e.path);
      }, 5000);
    });
  });
});

gulp.task('production', function () {
  process.env.NODE_ENV = 'production';
  building = true;
});

gulp.task('default', ['browserify', 'watch']);

gulp.task('build', ['production', 'browserify', 'less', 'css']);