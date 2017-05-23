---
title: 			"ProfitBricks Community"
description:	"ProfitBricks community & drivers."
synopsis:		"I have created software drivers for various Open-source cloud based applications for ProfitBricks, a cloud based solutions provider."
liveurl:		"https://devops.profitbricks.com/"
date:			"2016-09-01"
ongoing:		true
identifier:		"projects"
languages:	
- Javascript (ES5)
- Python
- HTML5
- PHP
frameworks:
- Django
- Dojo
- Apache LibCloud
- Ember.js
- jQuery
infrastructure:
- MySQL
- Linux
tools:
- Gulp
- JSLint
- Pylint
- Git
- Sublime Text
- Vagrant
---

## Odin APS driver
For this task, I needed to create the server side code and front end UI for a module that was designed to be plugged in as an [Odin APS package](https://dev.apsstandard.org/apps/2.0/ProfitBricks/ProfitBricks%20Cloud%20Infrastructure/ProfitBricks/). 

This allows hosting service providers to resell cloud based hosting services offered by ProfitBricks to their customers. 

The UI for the module allows users to manage their server infrastructure, with the server side component connecting to the ProfitBricks API.

## Apache Libcloud driver
My main tasks in working with the community involved rewriting an implementation of the ProfitBricks driver for the Apache Libcloud project. 

Apache Libcloud is a Python library that provides a common interface for managing servers remotely.

This rewrite was to faciliate the latest features offered by the new version of the ProfirBricks REST api.

## Devops website
An ongoing task was to maintain and add improvements to the [ProfitBricks devops website](https://devops.profitbricks.com/).

Improvements include a new drag and drop feature for uploading images with content, refactoring the style of the website and writing technical documentation for the two drivers mentioned above.

## Rancher UI Driver
As part of the release of the new ProfitBricks REST api, a rancher UI component driver was created in Ember.js to interact with the Docker Machine driver and allow the user to provision and monitor their VPSes.
