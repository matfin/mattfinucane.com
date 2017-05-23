---
title: "Building this site - An overview"
description: "Part one gives an overview of how this site was built."
synopsis: "In part one of this series we give an overview of what is used to build and maintain this site."
date: "2017-05-10"
author: "Matt Finucane"
identifier: "blog"
sponsored: false
disqus: true
uniqueid: 2821792309
categories:
- Hugo
- Docker
- CircleCI
- Gulp
---

## Objectives for this website
Since setting up my peronsal online presence back in 2008, my websites have gone through several iterations and relaunches.

The first release of this website ran on [WordPress](https://wordpress.org) with a custom theme I had created bolted on. 

Subsequent iterations launched in 2013 and then again in 2014 used a simple PHP back end and then the [Meteor](https://www.meteor.com) framework respectively.

Each time I released a new version of the site, it was getting closer to the ideal setup I wanted to have but not all the boxes were being ticked.

I wanted to create a simple portfolio site that would fulfill these requirements:

- Set up and maintain a healthy development environment.
- Deploying code and content should be fast, secure and easy.
- The site should have minimal dependencies and load quickly even on poor connections.
- Organising and writing content should be easy and intuitive especially for non-technical users.

With those requirements established, I set about exploring the various options and platforms available to me.

## Static site generators
A static site generator is a program or platform that generates the HTML structure for a website from a combination of layout templates and text content which is typically written in [Markdown](https://daringfireball.net/projects/markdown/syntax) format.

Markdown is a lightweight markup language formatted as plain text and when parsed, it generates clean HTML. 

Below is an example of some simple Markdown content.

```
## This is a second level heading

This is a normal paragraph with *emphasised* text.

- and this
- is a list
- of items
```

The HTML generated from what would look like the following:

```
<h2>
	This is a second level heading
</h2>
<p>
	This is a normal paragraph with <em>emphasised</em> text.
</p>
<ul>
	<li>
		and this
	</li>
	<li>
		is a list
	</li>
	<li>
		of items
	</li>
</ul>
```

As you can see, Markdown is much easier to maintain by hand but the HTML it generates is quite clean and semantic.

## Hugo
[Hugo](https://gohugo.io) is a static site generator written in the Go programming language. It has a simple opinionated structure for specifying content, sections, partials and shortcodes.

The compiled version of Hugo runs as a standalone binary, so it does not require any infrastructure to be installed, such as PHP, Ruby or NodeJS. 

It can be run once to generate the HTML for your site, or it can be run as a server that refreshes any changes made to content and templates. 

I chose this platform for the following reasons:

- support for shortcodes so custom items can be inserted directly into Markdown content (not just `p`, `h`, `ul` tags).
- support for layout and partial templates giving the user complete control over the generated HTML.
- static HTML negates the need to install extra infrastructure on a server (apart from a webserver).
- an intuitive project structure and clean code is nicely enforced.
- the Hugo binary can be run as a server, so changes to templates and content can be seen in real time.

## The development environment
Anyone who has tried setting up a content managed website on their local machine will be no stranger to compatibility issues that can arise, especially for those who have worked with Django, Drupal or Ruby on Rails. 

Different platforms can raise their own incompatibility issues, especially when managing the fragmented versions of major frameworks. 

To avoid this scenario and to allow me to easily test my site against new versions of the Hugo framework, I use [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

With these two installed (which can be easily done on any platform) I can bring up a development environment relatively quickly. I don't need to install all the infrastructure I am going to need in turn on my local machine.

Docker is a tool that manages self contained operating system runtimes and isolates them from one another. It's a bit like having running instances of Linux all running separately but working together to get the site running.

## Managing assets
Anyone building the front end for a website will have heard of the various task runners such as [Grunt](https://gruntjs.com/), [Gulp](http://gulpjs.com/) and [webpack](https://webpack.github.io/).

A task runner is a tool that is used to concatenate and minify your styles, scripts and images. This is important to ensure that the data coming down the wire is as small as possible and that the number of requests to load a page is kept to a minimum.

This project uses Gulp to handle assets and has two different setups for the development and build environments.

## Deploying changes
This website uses [GitHub](https://github.com) and [CircleCI](https://circleci.com/) to handle deployments. Whenever I have finished a feature or a fix, I merge these changes into the `develop` branch on GitHub and CircleCI picks up these changes, pushing a build to my staging server.

Likewise, when I push changes to the `master` branch of this project and tag a release, the changes are built and pushed to the production server.

## Wrapping up
This article provides an overview of how this site is set up. In [part two](/blog/hugo-setup) I will provide a more detailed overview of how I structured the content and layout for this site. The whole project can be seen on [GitHub](https://github.com/matfin/mattfinucane.com).



