---
title: "Building this site - Containerised development with Docker Compose"
description: "In part three of this series we look at getting a development environment set up using Docker."
synopsis: "In part three of this series we explore using Docker to get a development environment set up for Hugo."
date: "2017-05-12"
author: "Matt Finucane"
identifier: "blog"
sponsored: false
disqus: true
uniqueid: 639721210
categories:
- Hugo
- Docker
- CircleCI
- Gulp
---

## An overview of Docker and Docker Compose
Following on from the [first](/blog/building-this-site) and [second](/blog/hugo-setup) parts of this series, we will take a look at getting a development environment set up using [Docker](https://www.docker.com) and [Docker Compose](https://https://docs.docker.com/compose/).

Docker is a container management tool. A container is an isolated running instance of an operating system, usually set up with a piece of infrastructure required to complete a task. 

A container is a running instance of a Docker image and there are many different images available. You could find an image that contains an installation of MySQL, Wordpress, Python or any other platform of your choice.

Docker Compose is the tool that is used to download Docker images, create containers from them and get these containers working together to build the infrastructure for a website.

The benefits to containerised development are huge in terms of the effort required to get an environment running on a local machine.

Most container images are based on a minimalist flavour of Linux called [Alpine](https://alpinelinux.org/). These images are only a few MB in size in stark contrast to setting up an image on a virtual machine using Vagrant or VMWare.

I don't need to worry about incompatibilities that can arise between different platforms. I don't need to worry about MacPorts or Homebrew breaking on me.

I don't need to locally install each piece of infrastructure I need and I certainly don't need to go through that whole process if I wipe my hard drive.

I don't need to be tied to any particular version of a platform and worry about overwriting a local installation on my devlopment machine which might break one of my other projects.

**Note:** I am using **Docker Community Edition Version 17.03** for MacOS. You will need a recent version of Docker if you want to get a setup like mine running.

## The container set up for this website
This website uses three containers that work together as follows:

- The first container named `mf-site-dev` is derived from Alpine Linux and contains the binary for Hugo itself. This runs a development server for Hugo and builds out the site.
- The second container named `mf-nginx-dev` is derived from the `nginx:alpine` image acts as a reverse proxy that interfaces with the running Hugo server instance. This means I can access the development version of my site at `http://mattfinucane.dev` instead of `http://localhost:1313`.
- The third container named `mf-gulp-dev` is derived from the `node:8.0.0` image and handles dependencies that are installed with [NPM](https://www.npmjs.com) - the official NodeJS package manager. This container installs development dependencies and then exits when done.
- The final container named `mf-sass-dev` is derived from `ruby:2.1-alpine` and it acts as a CSS preprocessor - compiling my [SASS](http://sass-lang.com/) stylesheets to the plain CSS that the browser can understand.

## Taking a look at the set up for Docker
Docker Compose is the tool that is used to create containers from images, provision them and get them running. 

The `docker-compose.yml` file describes how these containers should be run and we can do things like expose ports to the host operating system, set environment variables and link containers to other containers.

## The static site container
This snippet from my Docker Compose file describes the set up for the container for Hugo.

```
mf-site-dev:
  mf-site-dev:
    container_name: mf_site_dev
    restart: on-failure
    build:
      context: .docker/site
      dockerfile: Dockerfile
      args:
        hugo_version: "0.20.2"
    ports: 
      - "1313:1313"
    volumes: 
      - ./:/opt:rw
    command: hugo server -s /opt/mattfinucane --config /opt/mattfinucane/config.yml --baseURL http://mattfinucane.dev/ --bind "0.0.0.0" --appendPort=false --verbose
```

We will take a look at each of the configuration parameters below:

- `container_name` simply gives the container its name.
- `restart` tells the container to restart itself if the service inside it falls over.
- `build` specifies the build parameters for the container.
- `build/context`  tells Docker Compose where additional configuration files can be found - in this case they are in the `.docker/site` directory.
- `build/dockerfile` tells Docker Compose where to find the Dockerfile, which contains additional pre-build commands needed before running the container.
- `build/args` allows us to pass in arguments to the Dockerfile which we can subsitute into the pre-build commands.
- `ports` allows us to expose the ports for the infrastructure running inside the container. Hugo runs its server on port 1313 so if we did not have this we could not connect to that server.
- `volumes` exposes our local filesystem to the container running Hugo and maps the containers `/opt` directory to the current directory with read-write access.
- `command` is the command we run to bring the container up. In this case, we are running the Hugo development server with the parameters above. If you want to know more about these parameters then check out the [Hugo configuration docs](https://gohugo.io/overview/configuration/).

If we take a look at the `Dockerfile` for the Hugo container, it looks like this:

```
FROM		alpine:latest
MAINTAINER	Matt Finucane <matfin@gmail.com>

ARG		hugo_version
RUN		rm -rf /opt/public

RUN 		apk add --update wget ca-certificates && \
		    cd /tmp/ && \
		    wget https://github.com/spf13/hugo/releases/download/v${hugo_version}/hugo_${hugo_version}_Linux-64bit.tar.gz && \
		    tar xzf hugo_${hugo_version}_Linux-64bit.tar.gz && \
		    rm -r hugo_${hugo_version}_Linux-64bit.tar.gz && \
		    mv hugo*/hugo* /usr/bin/hugo && \
		    apk del wget ca-certificates && \
		    rm /var/cache/apk/*

WORKDIR 	/opt
```

This is what each of the configuration parameters does:

- `FROM` tells Docker that this container derives from Alpine Linux. We use this as a base to start the build.
- `MAINTAINER` is self-explanatory.
- `ARG` is where we tell Docker that we will be using this argument. We will use string substitution to place this inside the build command. You will see that argument in the above snippet from the Docker Compose file.
- `RUN` are the pre-build commands we want to run when building this container. We clear out the `/opt/public/` directory and then install the Hugo binary.
- `WORKDIR` changes the working directory to `/opt` which is where the files for the site are installed.


## The Nginx container
Taking a look at this snippet from the `docker-compose.yml` file for the Nginx container, we see the following:

```
mf-nginx-dev:
  container_name: mf_nginx_dev
  build:
    context: .docker/nginx
    dockerfile: Dockerfile
    args:
      nginx_conf: nginx.development.conf
  volumes:
    - ./media:/opt/media:ro
  links: 
    - mf-site-dev
  ports:
    - "80:80"
  command: nginx -g "daemon off;"
```

The `links` parameter is something that we haven't seen in the first snippet. This tells Docker Compose that the Nginx container should be able to talk to the Hugo container. We need this because Nginx is acting as a reverse proxy for Hugo.

This is what the Nginx configuration file looks like:

```
worker_processes 4;

events {
	worker_connections 1024;
}

http {

	default_type	application/octet-stream;
	include 	/etc/nginx/mime.types;

	server {
		listen 80;

		server_name mattfinucane.dev;

		gzip 				on;
		gzip_proxied 			any;
		gzip_types 			text/plain text/css application/x-javascript;
		gzip_vary 			on;
		gzip_disable			"MSIE [1-6]\.(?!.*SV1)";

		access_log 			/var/log/access.log;
		error_log 			/var/log/error.log;

		location / {
			proxy_pass 			http://mf-site-dev:1313;
			proxy_http_version		1.1;
			proxy_set_header		Host $host;
			proxy_set_header		X-Forwarded-For $remote_addr;
			proxy_intercept_errors		on;
			error_page 404			/404.html;
		}
	}
```

We should pay special attention to the `proxy_pass` directive inside the `location/` block. 

The host name specified matches the name of the container for the Hugo static site generator. This is a very useful feature that Docker Compose provides.

If we take a look inside the `Dockerfile` for the Nginx container, we see the following:

```
FROM 		nginx:alpine
MAINTAINER	Matt Finucane <matfin@gmail.com>
ARG 		nginx_conf
COPY		$nginx_conf /etc/nginx/nginx.conf
```

The container image will be derived from `nginx:alpine` and the `COPY` command tells Docker to copy the `nginx.development.conf` file to the containers default location for the Nginx configuration.

Remember that the `ARG` directive pulls the filename for the Nginx configuration file from the snippet inside the `docker-compose.yml` file.

## The dependencies container

If we take a look at the snippet for the `mf-gulp-dev` container, we see the following:

```
mf-gulp-dev:
  container_name: mf_gulp_dev
  image: node:8.0.0-alpine
  restart: on-failure
  environment:
    - DEVELOPMENT=true
    - SCRIPTS_DEST=./mattfinucane/static/js/
    - SVG_DEST=./mattfinucane/static/svg/
    - FAVICONS_DEST=./mattfinucane/static/favicons/
  volumes:
    - ./:/opt:rw
  links:
    - mf-site-dev
  depends_on:
    - mf-site-dev
  command: sh -c "npm install -g gulp && npm link gulp && cd /opt && npm install && npm start"
```

We have specified an `image` which says should be derived from `node:8.0.0-alpine` which is one of the official images maintained by the creators of NodeJS.

Setting `restart: on-failure` will reboot the container if the process running inside it fails.

Here we see the `environment` configuration parameters. This is where we can set environment variables that need to be set for different deployment environments.

**Note:** We set `DEVELOPMENT=true` in this `docker-compose.yml` file so that the Gulp task runner knows that it should run the Gulp `watch` tasks. For more info, see [Building this site - Assets and Gulp](/blog/gulp-asset-management).

The environment variables above will tell my Gulp script where it needs to put the files it generates for styles, image assets and scripts. 

The `command` here will call `npm start` which itself will start the Gulp process to manage the Javascript source files.

## The SASS container

Finally, we can take a look at the container set up for the `mf-sass-dev` container.

```
mf-sass-dev:
  container_name: mf_sass_dev
  image: ruby:2.1-alpine
  restart: on-failure
  volumes:
    - ./:/opt:rw
  links:
    - mf-site-dev
  depends_on:
    - mf-site-dev
  command: sh -c "gem install sass && sass --watch /opt/assets/sass/main.sass:/opt/mattfinucane/static/css/main.css"
```

This container watches for changes to the source SASS files and generates CSS.

## Running your local development environment
Here, we have an overview of the Docker and Docker Compose set up for this website. 

The project is run with the following commands:

- `$ docker-compose build` downloads the images for the containers as needed and builds them.
- `$ docker-compose up` will run the post-build tasks for the containers, install their infrastructure and run them.
- `$ docker-compose down` will stop the containers again.

## Wrapping up
We have looked at how Docker and Docker Compose can be used to set up a development environment. 

It might look daunting at the start, but if you were to get a new development machine set up and needed to work on this project, all you would need to do is run the above commands and you are good to go.

This contrasts nicely against having to install all the required infrastructure on your local machine in turn.

Next, we will take a look at using Gulp to manage scripts, styles and assets in [part four](/blog/hugo-asset-management) of this series.






