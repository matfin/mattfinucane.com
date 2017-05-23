'use strict';

const 	gulp 		= require('gulp'),
		concat		= require('gulp-concat'),
		babel 		= require('gulp-babel'),
		jshint	 	= require('gulp-jshint'),
		babelmin	= require('gulp-babel-minify'),
		sass		= require('gulp-sass'),
		cleancss	= require('gulp-clean-css');

const dest = {
	scripts: process.env['SCRIPTS_DEST'],
	styles: process.env['STYLES_DEST'],
	svg: process.env['SVG_DEST'],
	favicons: process.env['FAVICONS_DEST']
};

gulp.task('debug', () => {
	console.log({
		destinations: dest
	});
});

/**
 *	Compile SASS into CSS
 */
gulp.task('sass-dev', () => {
	return gulp
	.src('./assets/sass/main.sass')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest(dest.styles));
});

gulp.task('sass-build', () => {
	return gulp
	.src('./assets/sass/main.sass')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(cleancss())
	.pipe(gulp.dest(dest.styles));
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
	gulp.watch('./assets/sass/**/*.sass', ['sass-dev']);
	gulp.watch('./assets/scripts/**/*.js', ['scripts-dev']);
	gulp.watch('./assets/svg/**/*.svg', ['svgs']);
});

/**
 *	Copmpile assets on boot and then watch.
 */
gulp.task('default', [
	'debug',
	'sass-dev',
	'scripts-dev',
	'svgs',
	'favicons',
	'watch'
]);

/**
 *	Build assets
 */
gulp.task('build', [
	'debug',
	'sass-build',
	'scripts-build',
	'svgs',
	'favicons'
]);