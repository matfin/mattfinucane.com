---
title: 			"Design Portfolio Static"
description:	"Portfolio site generated using Hugo."
synopsis:		"This is the online portfolio for Anna Christoffer, an Art Director based in Berlin."
github:			"https://github.com/matfin/annachristoffer/tree/develop"
date:			"2017-04-01"
ongoing:		true
identifier:		"projects"
languages: 		
- Javascript (ES7)
- HTML5
frameworks:
- Hugo
- Sass
infrastructure: 
- Docker
- Linux
- Nginx
- NodeJS
tools:
- Sketch
- Docker Compose
- CircleCI
- Gulp
- Sublime Text
- Adobe Photoshop
- Git
- Font Awesome
- BowerJS
---

## The brief
Design and build a responsive website that is fast and easy to maintain. Given that this is a portfolio website, images and videos will feature heavily.

They should look clean and crisp but not impact on loading performance over slow networks.

It should also be easy to add content to the website and to have new changes pushed to a staging and production environment automatically.

## Project planning
I opted to use [GoHugo](https://gohugo.io) a static site generator for the following reasons:

- No need for additional infrastructure such as a database for content that will rarely change anyway.
- Serving static HTML is simple and lightning fast.
- Content can be added as markdown, which makes updating the site easy.
- This generator uses a simple non-opinionated framework which makes it quite flexible.
- Although some search engines such as Google can index content generated using Javascript, server generated static content is still the best way to go for SEO purposes.

## Development environment
I started out this project by setting up a development environment using [Docker Compose](https://docs.docker.com/compose/) with three containers as follows:

- One for the static site generator.
- One for handling NPM and Bower dependencies.
- One to act as an Nginx reverse proxy for the GoHugo development server.

Using Docker along with Docker Compose makes it easier to handle individual project dependencies. It does away with problems that may arise between different platforms.

For handling static assets such as CSS and Javascript, I created a gulp file that concatenates and minifies scripts and stylesheets.

I use SASS as the CSS preprocessor framework and the ES7 standard for Javascript.

To handle responsive images, I use the HTML5 `<img> srcset` attribute, which allows me to specify the correct images to load given the device screen constraints.

## Deploying changes
For managing deployments, I use the [CircleCI](https://circleci.com/) in combination with Git. Any changes pushed to the `develop` branch are deployed to a staging server, while releases tagged from the `master` branch are deployed to the live server.

The static assets for the site will be generated using [gulp.js](http://gulpjs.com/) and then GoHugo will generate the rest of the content for the site, combining the content with the layout templates.

Using the [Let's Encrypt](https://letsencrypt.org/) tool, we can generate free SSL/TLS certificates and serve content over HTTPS. Nginx is also configured to serve content using the HTTP/2 protocol, which brings about big benefits in terms of speed.

## Benefits of this approach
By serving static content, we can do away with the need for databases and bootstrapping the project is much simpler. 

The resources needed to serve this site will be minimal compared to a standard content managed site set up using another tool like Wordpress or Drupal.








