const gulp     = require('gulp');
const clean    = require('gulp-clean');
const rename   = require('gulp-rename');
const pump     = require('pump')
const sass     = require('gulp-sass');
const babel    = require('gulp-babel');
const prefix   = require('gulp-autoprefixer');
const htmlmin  = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const cssmin   = require('gulp-cssmin');
const uglify   = require('gulp-uglify');
const browserSync = require('browser-sync').create();


gulp.task('imagemin', function() {
	return gulp.src('source/assets/images/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('destiny/images'))
});

gulp.task('htmlmin', function(){
	return gulp.src('source/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./'))
});

gulp.task('cssmin', function () {
  return gulp.src('destiny/css/*.{css, min.css}')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('destiny/css'));
});

gulp.task('compress', function (cb) {
  pump([
    gulp.src('destiny/js/*.js'),
    uglify(),
    gulp.dest('destiny/js')
  ],
  cb
  );
});

gulp.task('styles', function() {
	return gulp.src('source/sass/main.sass')
	.pipe(sass())
	.pipe(prefix())
	.pipe(gulp.dest('destiny/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('es6', function(){
  return gulp.src('source/js/main.js')
	.pipe(babel({
  		presets: ['es2015']
	}))
	.pipe(gulp.dest('destiny/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('clean-mincss', function() {
	return gulp.src('destiny/css/*.min.css', {read: false})
	.pipe(clean());
});

gulp.task('serve', function() {

	browserSync.init({
		server:{
			baseDir: './'
		}
	});

	gulp.watch('source/sass/main.sass', ['styles']);
	gulp.watch('source/js/*.js', ['es6']);
	gulp.watch('source/*.html', ['htmlmin']);
	gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['imagemin', 'htmlmin', 'styles', 'cssmin', 'es6', 'compress','serve']);
