---
title: "Building this site - Deployment"
description: "In part five of this series we take a look at deploying the site using CircleCI."
synopsis: "In part five of this series we take a look at deploying the site using CircleCI."
date: "2017-05-14"
author: "Matt Finucane"
identifier: "blog"
sponsored: false
disqus: true
uniqueid: 1713647289
categories:
- Hugo
- Docker
- CircleCI
- Gulp
---

## An overview of deploying the site
In the previous parts of this series, we looked at [an overview of this site](/blog/building-this-site), the [Hugo setup](/blog/hugo-setup), setting up a [development environment](/blog/hugo-docker-setup) with Docker and [asset management](/blog/hugo-asset-management) with Gulp.

We will now take a look at how to deploy this site with [Github](https://github.com) and [CircleCI](https://circleci.com).

Github is an online service that uses Git as its source control manager. Both of these are the most widely used services for managing source code today.

CircleCI is a continuous integration tool that ties nicely into Github and facilitates testing and automated deployment for applications.

Both are free to use for small projects exavtly like this one. My server is a simple VPS set up courtesy of [Digital Ocean](https://www.digitalocean.com) that costs me US$5 a month to run.

Since Hugo is a static site generator, I don't need a very powerful server to run this portfolio site because I'm not relying on extra infrastructure such as MySQL or Wordpress.

On the staging and production environments, the site is served over HTTPS using the HTTP/2 protocol. 

## CircleCI
To get started with CircleCI, I signed up using my Github credentials. I was presented with a list of my repositories from Github and I was able select the one for this website.

This allows CircleCI to listen for pushes to the branches within this repository and attempt to carry out tests and builds.

CircleCI will check out the latest code from your branch and then follow the instructions inside the `circle.yml` file as follows:

```
machine: 
  node:
    version: 7.7.4

dependencies:
  pre:
    - cd /tmp
    - wget https://github.com/spf13/hugo/releases/download/v0.20.2/hugo_0.20.2-64bit.deb
    - sudo dpkg -i hugo*.deb
    - npm install -g gulp
    - npm link gulp

test:
  override:
    - echo "Tests are coming soon."

deployment:
  staging: 
    branch: develop
    commands:
      - hugo -s ./mattfinucane -b $HUGO_STAGING_HOST --config=./mattfinucane/staging.yml -d ../public
      - npm install
      - gulp build
      - tar -zcvf public.tar.gz public/
      - scp public.tar.gz $DEPLOY_USER@$DEPLOY_STAGING_HOST:$DEPLOY_STAGING_PATH
      - ssh -t $DEPLOY_USER@$DEPLOY_STAGING_HOST "
            cd $DEPLOY_STAGING_PATH &&
            rm -rf public/ &&
            tar -xvzf public.tar.gz &&
            mkdir public/.well-known"

  production:
    tag: /v[0-9]+(\.[0-9]+)*/
    commands:
      - hugo -s ./mattfinucane -b $HUGO_PRODUCTION_HOST --config=./mattfinucane/production.yml -d ../public
      - npm install
      - gulp build
      - tar -zcvf public-$CIRCLE_TAG.tar.gz public/
      - scp public-$CIRCLE_TAG.tar.gz $DEPLOY_USER@$DEPLOY_PRODUCTION_HOST:$DEPLOY_PRODUCTION_PATH
      - ssh -t $DEPLOY_USER@$DEPLOY_PRODUCTION_HOST "
            cd $DEPLOY_PRODUCTION_PATH &&
            rm -rf public/ &&
            tar -xvzf public-$CIRCLE_TAG.tar.gz &&
            mkdir public/.well-known"
```

We will go through this file and explain what each item does:

- The `machine` config hints to CircleCI what type of image we want to use - in this case Node v7.7.4. We do this because we don't want to have to specify instructions for installing it.
- The `dependencies` directive executes a series of commands to install a pre-build dependency. In this case, we need to install Hugo and Gulp.
- The `test` directive runs any tests. This is required.
- The `deployment` directive takes two further arguments (`staging|production`) with these two being assigned branches that are associated with each of these.
- `deployment/staging` will execute the `commands` when there is a push made to the `develop` branch for the repository.
- `deployment/production` will execute the `commands` when a new tag is pushed to the repository. This happens when we create a new release from within Github and this release is usually tagged from the master branch.

You will notice that there are various string substitutions within these command directives. This is where sensitive data in the form of environment variables is places. It's never a good idea to put real values in here and commit them to a code repository.

CircleCI allows you to configure this sensitive information as environment variables that only you can see.

If we take a closer look at what the `commands` directive does, we see the following:

- The first command tells Hugo to generate a site for us. It specifies the source for all the content and templates, the config file for the set up and finally the directory to dump the generated HTML in to.
- The second and third commands install the Gulp plugin dependencies and then run the Gulp build task, which generates our style, script and image assets.
- The fourth command creates a compressed archive of the entire site with the HTML and static assets.
- The fifth command copies the site to the staging or production servers.
- The last command then opens an SSH session to the server and executes some more commands to extract the new version of the site.

## A note on security
It is always a good idea to disable password based logins for your production servers.

Using a private SSH key is always better because it means you have more control over who can access your server. 

Those without the key cannot get in. It is possible to create a private key and paste this in to the repository configuration inside CircleCI. 

This allows CircleCI to open secure sessions to your servers with its own key. 

## Setting up your staging and production servers
Setting up a server is quite simple and there are plenty of resources available online to help you with this. While writing about this here goes beyond the scope of this post, I can highly recommend the following links to get you started:

- You will need a server running Nginx. Follow this excellent [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04) on how to do so.
- I was able to secure my site for free using [Let's Encrypt](https://letsencrypt.org). Follow this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04) for more info.
- Serving content over HTTP/2 is also strongly recommended. Follow this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-16-04) for more information on how to do that.

## Wrapping up
We now have an overview of how we can automate the deployment process for this site using the many free and Open-source tools available to us.

Feel free to check out the [conclusion](/blog/hugo-conclusion) of this series on how to set up, maintain and deploy a site using Hugo. 
