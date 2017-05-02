---
title: 			"Monoqi Business"
description:	"B2B platform for Monoqi."
synopsis:		"Website to connect Designers with those who stock and sell their products."
liveurl:		"https://www.monoqibusiness.com/"
date:			"2014-11-01"
duration:		"75 days"
languages: 		
- Javascript (ES5)
- PHP
frameworks:
- Magento
infrastructure:
- Linux
- MySQL
tools:
- BowerJS
- Grunt
- Vagrant
- Sublime Text
- Bitbucket
- Adobe Photoshop
- Sketch
---

## Monoqi Business
Monoqi Business is a wholesale platform used to connect designers and manufacturers with their buyers.

### The brief
Our task was to work with the back end Magento developers to redevelop the site with a more modern look and feel. 

### Project planning and development
We set about with the following in mind:

- The server side set up used the tried and tested LAMP stack.
- Bootstrap was used as the front-end styling framework.
- External Javascript dependencies were handled using BowerJS and Grunt.
- Development environments were managed using Vagrant with a config file.

With those in mind, my job was to create the various product list pages (with filters), the product detail pages showing all combinations of a type of product (size, colour etc). 

I also created the user authentication and purchase flows. We used Sketch as our prototyping tool.

### Deploying changes
We used git flow to manage the branches for our features and fixes. Git flow automates common tasks when it comes to a multi user-project. Once we had finished working on a feature or hotfix, it was merged into the develop or master branches respectively and deployed using Jenkins CI.