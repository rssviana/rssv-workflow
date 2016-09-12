const gulp   = require('gulp');
const sass   = require('gulp-sass');
const babel  = require('gulp-babel');
const prefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('es6', function(){
    return gulp.src('source/assets/js/main.js')
        		.pipe(babel({
            		presets: ['es2015']
        		}))
        		.pipe(gulp.dest('destiny/js'))
        		.pipe(browserSync.reload({stream: true}));
}

);

gulp.task('styles', function() {
	gulp.src('source/assets/sass/main.sass')
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest('destiny/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function() {

	browserSync.init({
		server:{
			baseDir: './'
		}
	});

	gulp.watch('source/assets/sass/main.sass', ['styles']);
	gulp.watch('source/assets/js/*.js', ['es6']);
	gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'es6','serve']);