---
title: 			"Monoqi Business"
description:	"B2B platform for Monoqi."
synopsis:		"Monoqi Business is a wholesale platform used to connect designers and their products with international resellers."
liveurl:		"https://www.monoqibusiness.com/"
date:			"2014-11-01"
duration:		"45 days"
identifier:		"projects"
languages: 		
- Javascript (ES5)
- PHP
frameworks:
- Magento
- jQuery
infrastructure:
- Linux
- MySQL
tools:
- BowerJS
- Grunt
- Vagrant
- Sublime Text
- Adobe Photoshop
- Sketch
---

## The brief
Our task was to work with the back end Magento developers to overhaul the existing website. 

## Project planning and development
We set about with the following in mind:

- The server side set up used the tried and tested LAMP stack.
- Bootstrap was used as the front-end styling framework.
- External Javascript dependencies were handled using BowerJS and Grunt.
- Development environments were managed using Vagrant with a config file.

With those in mind, my job was to create the various product list pages (with filters), the product detail pages showing all combinations of a type of product (size, colour etc). 

I also created the user authentication and purchase flows. We used Sketch as our prototyping tool.

## Deploying changes
We used git flow to manage the branches for our features and fixes. Git flow automates common tasks when it comes to a multi user-project. Once we had finished working on a feature or hotfix, it was merged into the develop or master branches respectively and deployed using Jenkins CI.