'use strict';

const 	gulp 		= require('gulp'),
		concat		= require('gulp-concat'),
		babel 		= require('gulp-babel'),
		jshint	 	= require('gulp-jshint'),
		babelmin	= require('gulp-babel-minify');

const dest = {
	scripts: process.env['SCRIPTS_DEST'],
	svg: process.env['SVG_DEST'],
	favicons: process.env['FAVICONS_DEST'],
	development: process.env['DEVELOPMENT'] != null
};

/**
 *	If we have the environment variable
 *	indicating this is a development
 *	environment, return the development
 *	tasks or return the build tasks.
 */
const tasks = () => {
	if(dest.development) {
		return [
			'debug',
			'scripts-dev',
			'svgs',
			'favicons',
			'watch'
		];
	}
	else {
		return [
			'debug',
			'scripts-build',
			'svgs',
			'favicons'
		];
	}
};

gulp.task('debug', () => {
	console.log({
		destinations: dest
	});
});

/**
 *	Javascript assets
 */
gulp.task('scripts-dev', () => {
	return gulp
	.src('./assets/scripts/**/*')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('main.js'))
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest(dest.scripts));
});

/**
 *	Javascript assets
 */
gulp.task('scripts-build', () => {
	return gulp
	.src('./assets/scripts/**/*')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('main.js'))
	.pipe(babelmin({
		presets: ['es2015']
	}))
	.pipe(gulp.dest(dest.scripts));
});

/**
 *	SVG assets
 */
gulp.task('svgs', () => {
	return gulp
	.src('./assets/svg/**/*')
	.pipe(gulp.dest(dest.svg));
});

/**
 *	Favicons
 */
gulp.task('favicons', () => {
	return gulp
	.src('./assets/favicons/**/*')
	.pipe(gulp.dest(dest.favicons));
});

/**
 *	The watch task should rerun sass-dev when 
 *	changes are detected.
 */
gulp.task('watch', () => {
	gulp.watch('./assets/scripts/**/*.js', ['scripts-dev']);
	gulp.watch('./assets/svg/**/*.svg', ['svgs']);
	gulp.watch('./assets/favicons/**/*', ['favicons']);
});

/**
 *	Copmpile assets on boot and then watch.
 */
gulp.task('default', tasks());