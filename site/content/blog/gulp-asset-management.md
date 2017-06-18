---
title: "Building this site - Assets and Gulp"
description: "In part four of this series we take a look at managing assets with Gulp."
synopsis: "In part four of this series we take a look at managing assets with Gulp."
date: "2017-05-13"
author: "Matt Finucane"
identifier: "blog"
sponsored: false
disqus: true
uniqueid: 1037766077
categories:
- Hugo
- Docker
- CircleCI
- Gulp
---

## Managing assets with Gulp
Previously in this series, we looked at [an overview](/blog/building-this-site) of this site, the [Hugo set up](/blog/hugo-setup) and how to get a [development environment](/blog/hugo-docker-setup) set up using Docker and Docker Compose.

In this fourth part of the series, we take a look at using [Gulp](http://gulpjs.com/) to build out our scripts and styles and manage images and SVG files.

Gulp is a Javascript task runner that processes source files and generates them into something the browser can understand. We use it here for the following:

- Our scripts are written in Javascript using the ES7 syntax. We convert these to the more widely-supported ES5 syntax to maintain compatibility using the [BabelJS](https://babeljs.io) transpiler tool.
- This site also contains a series of different image files for favicons and SVG icons. Gulp takes care of copying these to the correct place during development and build.

## A quick note about package.json
The `package.json` file contains the metadata and dependency configuration for this project. 

This is what the Node Package Manager (NPM) uses to install the dependencies for this site.

It also contains the scripts that need to be run when building and running the site for any platform. 

If we look inside the `scripts` configuration parameter inside this file, we see the following:

```
"scripts": {
  "test": "echo \"Tests are coming soon\" && exit 0",
  "start": "gulp"
},
```

If we run `npm start` from the command line (or specify it inside the `docker-compose.yml` command directive), the script specified inside `start` will be called. This makes things cleaner and much simpler.

## The Gulp file.
To understand the build process for this site, we will take a look at the contents of the `gulpfile.js`.

First, we need to declare the Gulp plugins we are using and we do this as follows:

## Set up for the tasks

```
let	gulp		= require('gulp'),
	concat		= require('gulp-concat'),
	babel		= require('gulp-babel'),
	jshint		= require('gulp-jshint'),
	babelmin	= require('gulp-babel-minify');
```

Each of the items that are imported with `require` are responsible for the following:

- `gulp` is the Gulp task runner.
- `concat` reads in and joins all the JS source files together.
- `babel` is a transpiler that converts ES7 code to use the ES5 syntax which has universal browser support.
- `jshint` is a tool that checks your source code for cleanliness.
- `babelmin` minifies the concatenated Javascript source.

**Note:** All these items are plugin dependencies that are specified in the `package.json` file and installed using `npm install`.

Next up, we specify a `dest` object that contains the paths so we can tell Gulp where to put the generated files.

```
const dest = {
	scripts: process.env['SCRIPTS_DEST'],
	svg: process.env['SVG_DEST'],
	favicons: process.env['FAVICONS_DEST'],
	development: process.env['DEVELOPMENT'] != null
};
```

Next up, I have written a small helper function to determine the tasks that are run when `npm start` is called from the command line. I have configured `npm start` to call `gulp` inside the `package.json` file. 

This functions returns an array of tasks depending on which environment variable has been set. 

```
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
```

If we are using a development environment, then the `watch` task will be run meaning that the Gulp file will run as a process and keep watching for changes to the JS source files.

For build environments, the `dest.development` variable will not be set, so Gulp will compile the files once and then exit.

## Task to manage source scripts

Next, we will take a look at one of the tasks that builds out the Javascript source files.

```
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
```

In this case, we are doing the following:

- `.src(...)` will tell the task where the source files are.
- `.pipe(jshint())` will then run the source JS through the JSHint tool to check for common mistakes
- `.pipe(jshint.reporter('default'))` will output any issues to the console.
- `.pipe(concat('main.js'))` will join all the JS source files together into one file - `main.js`.
- `.pipe(babel(...))` will then transpile our ES7 code to ES5.
- `.pipe(gulp.dest(...))` will then dump the generated `main.js` file to a directory specified in the environmnt variables.

**Note:** We also have a task called `scripts-build` that is very similar to the above with the exception being that we pipe the output of the concatenated scripts to `babelmin(...)` so we generate a minified source file.

## Tasks to manage favicon and SVG assets

The tasks for handling SVG and favicon assets are as follows:

```
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
```

These tasks read in all the assets and copy them to a directory specified as an environment variable.

## The watch task

We then have the watch task, which keeps Gulp running as a process that watches for changes to files and then reruns each task specified.

```
gulp.task('watch', () => {
	gulp.watch('./assets/scripts/**/*.js', ['scripts-dev']);
	gulp.watch('./assets/svg/**/*.svg', ['svgs']);
	gulp.watch('./assets/favicons/**/*', ['favicons']);
});
```

Finally we set up the `default` gulp task and this is what is run when `gulp` is run from the command line.

## Finally

```
gulp.task('default', tasks());
```

The `tasks()` function (described above) decides which series of tasks Gulp should run. For development environments, we are interested in running all the development tasks and then running the watch task so we can see updates in real time.

It wouldn't make sense to call the watch task when building the site, so the `tasks()` function omits that and calls the other build tasks in turn and then exits.

**Note:** `process.env` is used to read in environment variables from the Docker container run time. These environment variables are specified in the Docker Compose file.

## SASS
In previous iterations of this project, I was using the `node-sass` plugin to compile SASS files into CSS. I dropped this in favour of using the Ruby SASS tool which is faster and more stable.

## Wrapping up
We now know the ideal set up for managing assets using Gulp. In the [next part](/blog/hugo-deployment) of this series, we will explore deploying the site to stating and production servers.

