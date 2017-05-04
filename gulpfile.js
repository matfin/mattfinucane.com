'use strict';

const 	gulp 	= require('gulp'),
		concat	= require('gulp-concat'),
		sass	= require('gulp-sass');

/**
 *	Copy the font-awesome font dependencies.
 */
gulp.task('copy-fa-fonts', () => {
	return gulp
	.src(['./node_modules/font-awesome/fonts/**/*'])
	.pipe(gulp.dest('./mattfinucane/static/fonts/'));
});

/**
 *	Then copy the font-awesome sass.
 */
gulp.task('copy-fa-sass', () => {
	return gulp
	.src(['./node_modules/font-awesome/scss/**/*'])
	.pipe(gulp.dest('./assets/sass/thirdparty/font-awesome/'));
});

/**
 *	Compile SASS into CSS, ensuring the font awesome
 *	dependencies are copied over first.
 */
gulp.task('sass-dev', ['copy-fa-fonts', 'copy-fa-sass'], () => {
	return gulp
	.src('./assets/sass/main.sass')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('./mattfinucane/static/css/'));
});

/**
 *	Javascript assets
 */
gulp.task('scripts', () => {
	return gulp
	.src('./assets/scripts/**/*')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('./mattfinucane/static/js'));
});

/**
 *	The watch task should rerun sass-dev when 
 *	changes are detected.
 */
gulp.task('watch', () => {
	gulp.watch('./assets/sass/**/*.sass', ['sass-dev']);
	gulp.watch('./assets/scripts/**/*.js', ['scripts']);
});

/**
 *	Copmpile assets on boot and then watch.
 */
gulp.task('default', [
	'sass-dev',
	'scripts',
	'watch'
]);