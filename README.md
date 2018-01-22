# mattfinucane.com

This is my portfolio website built using the [GoHugo](https://gohugo.io/) static site framework. It contains information on the languages, frameworks and tools that I use everyday.

My motivation for creating this site was to be able to have something fast and simple with minimal dependencies.

Previous iterations of my portfolio created within the last ten years didn't have any of this compared to now.

## Technical overview
GoHugo is a static site generator that compiles Markdown and templates into static HTML, with other assets being handled separately.

Traditional content managed websites such as those built with Wordpress, Drupal or Django would need to have the following:

- The server run time infrastructure such as PHP or Python running in the background.
- A relational database management system such as MySQL or Postgresql.
- The CMS framework to manage content and render the templates. 

These would need to be set up and well maintained with monitoring and security updates. 

For small content sites, such as this one, GoHugo vastly simplifies this process by generating the whole site as static HTML which can be dumped on a server and served up with Nginx.

Another big benefit is speed - serving static files is fast.

### Content and layout
This is how the content and layout templates work together.

- Content types are specified inside the `mattfinucane/archetypes` directory with the actual content being placed inside the `mattfinucane/content` directory.

- Content types also match up to the content and sections as following example shows:
	- `mattfinucane/archetypes/project` defines the metadata for the content for a project.
	- `mattfinucane/content/projects` is where each file for a project goes. This contains the metadata as well as the content underneath in Markdown format.
	- `mattfinucane/layout/projects/list.html` is the template used to render a list of projects.
	- `mattfinucane/layout/projects/card.html` renders and individual project card that shows the title and description.
	- `mattfinucane/layout/projects/single.html` is the template used to render all the information on a single project, where we can access the metadata and markdown content.
	- To view a list of projects the url is `http://my-website.com/projects`.
	- To view an individual project, the url is `http://my-website.com/projects/my-project` assuming the file path for the content itself is `mattfinucane/content/projects/my-project.md`.

- Individual pages (those without list and detail views) are mapped as follows:
	- `content/about.md` contains the metadata for the about page, such as the `title` and `description` along with the content in Markdown format.
	- `layouts/_default/single.html` is the template used to render this content.

- General configuration for the whole site is specified in the files for each environment as follows:
	- `config.yml` for the local development environment.
	- `build.yml` to test a local build which contains minified assets and static HTML.
	- `staging.yml` and `production.yml` for their respective environment.

### Scripts, SVG and style assets
The GoHugo framework does not handle these assets, so I have the following setup:

- [SASS](http://sass-lang.com/) is used as the CSS preprocessor and handles concatenating the different stylesheets into one file. I keep the source for this inside the `assets/sass/` directory.
- The source for the scripts are inside the `assets/scripts` directory.
- The SVG assets (sprite and individual files) are kept inside the `assets/svg` directory.
- [Gulp](http://gulpjs.com/) is the task runner that manages the build process for these assets.
- Gulp has its own plugins as dependencies. I use [npm](https://www.npmjs.com/) to handle these - see `package.json`.

### Gulp
Gulp is a task runner that handles the following tasks:

- SASS is compiled to CSS using the `gulp-sass` plugin. The file `main.css` is copied over to `/mattfinucane/static/css/` on changes to the SASS files.
- Javascript is written using the ES2015 syntax. This gets concatenated and copied over to `mattfinucane/static/js` as `main.js`.
- SVG files are copied over to `mattfinucane/static/svg`.

Gulp watches files for changes in the background and automatically runs these tasks. When building, Gulp runs once and minifies the content as an extra step.

### Docker
To get my development environment set up, I opted to use [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/). 

Docker is very useful because it allows you to set up a `container` which is somewhat like a virtual machine and use an operating system of your choice, no matter what platform you are working on.

Docker Compose is useful because it means that containers can talk to each other easily and can be started and stopped in order.

I have the following Docker set up for my development environment.

- The first container acts and an Nginx reverse proxy so I can see the site at http://mattfinucane.local instead of http://localhost:1313
- The second container is NodeJS based and handles the build processed for the image, css and script assets through Gulp.
- The third container runs Hugo itself as a server and listens for changes to the content and layout files.

The configuration for these containers is defined inside `docker-compose.yml` with the configuration for testing local builds defined inside `build.yml`.

To run my development environment, all I need to do is run `$ docker-compose build` once and then `$ docker-compose up`. 

To test a local build with minified assets and static HTML generated, I need to run `$ docker-compose -f build.yml up`.

**Note:** to make sure the site is accessible over `http://mattfinucane.local` or `http://mattfinucane.build` I need to edit my `hosts` file to point `127.0.0.1` to `mattfinucane.local` and `mattfinucane.build`.

### Deployments

I use [CircleCI](https://circleci.com/) to handle deployments and the config for this is specified inside `circle.yml`.

Any time I push to the `develop` branch for the GitHub repo for this site, the changes will be automatically deployed to a staging server.

Any time I tag a release from the master branch with a particular format (v2.x.x), the changes will be deployed to a production server.

I have secret environment variables set up in CircleCI to subsitute the values inside `circle.yml`. 

I use a $5 a month [Digital Ocean](https://www.digitalocean.com/) droplet with Ubuntu 16.04 as my server which has Nginx installed on it.

For serving content securely, I use the free [Let's Encrypt](https://letsencrypt.org/) tool. Follow this [excellent tutorial](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04) for more info.







