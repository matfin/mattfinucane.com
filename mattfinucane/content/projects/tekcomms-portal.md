---
title: 			"Tekcomms Community Portal"
description:	"Engineers portal for Tektronix Communications."
synopsis:		"The Tekcomms Community Portal is a knowlege base for telecomms engineers."
liveurl:		"https://serviceprovider.netscout.com/user"
date:			"2013-09-01"
duration:		"120 days"
identifier:		"projects"
languages: 		
- Javascript (ES5)
- PHP
- HTML5
frameworks:
- Drupal
- Sass
- jQuery
infrastructure:
- Linux
- Apache
- MySQL
tools:
- Sublime Text
- Git
- Vagrant
---

## The brief
Tekcomms is a software and hardware solutions provider for the telecom industry.

We had to extend the Tekcomms website to provide a password protected community portal and knowlege base for telecomms engineers. 

Upon signing in, an engineer would be presented with a customised list of technical documents for the hardware they were working with.

We also needed to integrate the community portal with third party lead generation tools the organisation was using for their clients.

## Project development
Our tasks for the project were outlined as follows:
 
- Build out the HTML, CSS and Javascript for the given templates, tying them all together using the Drupal view module.
- Build server side hooks that would take new user registration data and push it to the various sales tools being used.
- Use various Drupal modules to filter documents to the correct users with the correct permissions set for their roles.
- Create an automated document import tool that would index and retrieve documents at a timed interval, updating their metadata.

The templates were built using HTML5, with Compass being used as the SASS preprocessor and jQuery used for UI behaviours.

## Difficulties encountered
Keeping data in sync across developer machines was a tall task given Drupal. There were cases where templates and modules needed to be built and exported, to be imported to another machine.

This was a task fraught with errors and only a fraction of the code worked on could be committed to the SVN repository.

If you are working with a system where you need to paste code into a web form to complete a task, you know you are doing the wrong thing.

