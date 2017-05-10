'use strict';

const 	gulp 	= require('gulp'),
		concat	= require('gulp-concat'),
		sass	= require('gulp-sass');

/**
 *	Compile SASS into CSS
 */
gulp.task('sass-dev', () => {
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
	.pipe(gulp.dest('./mattfinucane/static/js/'));
});

/**
 *	SVG assets
 */
gulp.task('svgs', () => {
	return gulp
	.src('./assets/svg/**/*')
	.pipe(gulp.dest('./mattfinucane/static/svg/'));
});

/**
 *	The watch task should rerun sass-dev when 
 *	changes are detected.
 */
gulp.task('watch', () => {
	gulp.watch('./assets/sass/**/*.sass', ['sass-dev']);
	gulp.watch('./assets/scripts/**/*.js', ['scripts']);
	gulp.watch('./assets/svg/**/*.svg', ['svgs']);
});

/**
 *	Copmpile assets on boot and then watch.
 */
gulp.task('default', [
	'sass-dev',
	'scripts',
	'svgs',
	'watch'
]);