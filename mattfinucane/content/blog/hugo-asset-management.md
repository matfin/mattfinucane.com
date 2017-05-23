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

- Our styles are written in [SASS](http://sass-lang.com/) format. Gulp processes these into CSS using the `gulp-sass` plugin.
- Our scripts are written in Javascript using the ES7 syntax. We convert these to the more widely-supported ES5 syntax to maintain compatibility using the [BabelJS](https://babeljs.io) transpiler tool.
- This site also contains a series of different image files for favicons and SVG icons. Gulp takes care of copying these to the correct place during development and build.

## Styles using SASS
SASS is a CSS preprocessor and it allows developers to write neat and consice stylesheets that are then compiled into the standard CSS the browser can understand. 

SASS has features such as mixins and functions that make it much easier to maintain than vanilla CSS. This makes maintenance much more manageable.

For this project, I keep the source for my SASS inside the `/assets/sass` directory in the root of my project. I have declared stylesheets for the different sections of the site, the shortcodes, partials, typography and layout.

This makes things more maintainable, intuitive and easier for new developers to understand. All files are included inside `/assets/sass/main.sass`.

If we take a look at this snippet from the `gulpfile.js` we see the following tasks to process SASS into CSS.

```
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
```

Here we have done the following:

- We declare a task with a name `sass-dev` which we will need to use later.
- The `gulp.src` function loads the main source file.
- We pipe the output from the previous step in to the `sass()` function.
- We then log any errors if they arise.
- We then finally pipe the resulting CSS output to the directory specified by `dest.styles`. 
- This directoty is read in from the environment variables at the top of the file.

## Watch and build tasks
While you are developing your site, it is important to be able to refresh your asset files on the fly as you edit their source. 

Gulp provides a `watch` task to take care of this and it looks like the following:

```
gulp.task('watch', () => {
	gulp.watch('./assets/sass/**/*.sass', ['sass-dev']);
	gulp.watch('./assets/scripts/**/*.js', ['scripts-dev']);
	gulp.watch('./assets/svg/**/*.svg', ['svgs']);
});
```

What this does is it watches every source code file in the configured directory and runs the task specified in the second argument each time there is a change to any of those files.

The default Gulp task is run when specified inside the `gulpfile` and it looks as follows:

```
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
```

What happens here is that when `gulp` is run without any arguments, this task gets run. In this case, we run all the tasks named in the array passed in as the second argument in turn.

We are building out the assets initially and then running the watch task. You may remember from the [previous article in this series](/blog/hugo-docker-setup) we ran a command when the asset building container was started. 

This command looks like: 
```
command: sh -c "cd /opt && npm link gulp && gulp"
```

We also have a build task specified that does not watch changes to the source code, which looks like this:

```
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
```

When building out a local version of the site or deploying to the staging or production environments for this site, it doesn't make sense to watch for changes.

When building for deployment, we have some extra steps inside the `gulpfile.js` to further concatenate minify the generated assets. 

We do this to minimise filesizes and the number of requests sent to the server when the site loads.

## Gulp plugins we use.

The Gulp task runner does have its own build in functionality, but sometimes we need something extra. This is where Gulp plugins come in handy. 

For this website, I used the following plugins:

- `gulp` is the task runner itself and is the first import inside the Gulpfile.
- `gulp-concat` generates a single named file from a group of other files.
- `babel` is a transpiler that converts the ES7 flavour of Javascript back to ES5 for backwards compatibility.
- `babelmin` does the same as above but also minifies the generated script.
- `gulp-jshint` will check the code for quality issues.
- `sass` is the CSS preprocessor we are using that converts our source SASS files to CSS.
- `cleancss` takes in the CSS and minifies the output to reduce filesize.

Hugo likes to keep all static assets inside the `static/` directory of the root of the site and in this case the files are kept inside `/mattfinucane/static/`.

I prefer to keep the source files I am working with in the `/assets/` directory so I can commit these to GitHub.

## A note on using environment variables
You may be wondering why environment variables are being used to dicate where the generated styles, assets and scripts are placed. 

The reason for this is because of the Docker set up I have for building the site. We have a problem where the container for Hugo is run first and builds out the site, but this happens before the `static_dev` container has had a change to run.

When all the containers are built, Hugo finishes first and it has generated the HTML from the content and layout templates. Because the assets container takes longer to run, the generated assets don't make it in to the build process for Hugo in time. 

This results in an unstyled site. I overcome this by copying the style, script and image assets directly to the `public/` directory. Normally, hugo would pick up what is inside the `mattfinucane/static` directory and then build out with the assets included.

Inside my gulp file I have the following:

```
const dest = {
	scripts: process.env['SCRIPTS_DEST'],
	styles: process.env['STYLES_DEST'],
	svg: process.env['SVG_DEST'],
	favicons: process.env['FAVICONS_DEST']
};
```

For running a local development server, I have set the destination for the assets to be `mattfinucane/static` because Hugo will pick these up since it is running as a server process.

For building out the site for other environments, I copy the files as follows:

- Styles go to `public/css/`
- SVG files go to `public/svg` 
- Favicons go to `public/favicons`
- Scripts to to `public/scripts`

## Wrapping up
We now know the ideal set up for managing assets using Gulp. In the [next part](/blog/hugo-deployment) of this series, we will explore deploying the site to stating and production servers.

