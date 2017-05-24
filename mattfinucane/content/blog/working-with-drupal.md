---
title: "My experiences working with Drupal."
description: "Discussing the merits of module based development and content managed frameworks."
synopsis: "I talk about my experience working with module based development and my experiences in working with Drupal, a content management platform."
date: "2017-05-24"
author: "Matt Finucane"
identifier: "blog"
sponsored: false
disqus: true
uniqueid: 4051171473
categories:
- PHP
- Drupal
---

## A foreword
In this article I discuss my experiences in working with Drupal, an Open-source content management framework.

The content of this post is only intended to be constructive for all and not to detract from the hard work the creators and the community have put into this project.

## What are modules and frameworks?
A framework is a tool and piece of infrastructure that contains the basic functionality needed to build a website or an application. It usually provides pre-built solutions for common tasks such as content editing and user registration.

A module (or plugin) is something smaller that can optionally be added to a framework to extend its functionality for more use cases.

## Module based development
Given the number of mature languages and frameworks available today, there is an infinte number of ways you can put a website or application together.

You could choose a low level language and build everything from scratch - a bad thing due to the maintenance effort required.

You could also choose an of-the-shelf framework that *does everything for you* and install a myriad of modules and plugins to get your product working the way you want it to.

This is also a very bad thing long-term and the purpose of this article is to see why.

## Why is module based development a bad thing?
When starting out a new project it is imperative to get it launched with minimal effort and in good time. 

This gives rise to the temptation to choose a pre-built platform and install a list of modules and plugins to fulfill requirements while trying to avoid writing any code.

This is something that will work in the very short term but increases complexity in the longer term for the following reasons:

- The more modules you install the more code you are using that you have little or no control over. This increases project complexity and maintenance efforts.
- You might be installing a larger module and using a fraction of its functionality. This leads to a larger codebase and affects performance.
- Third party module development slows down and the modules become outdated and stale. Issues within that module become issues within your own project.
- Major upgrades to your framework of choice will often invalidate modules because they won't work with the new version anymore.
- Poorly written modules that take short-cuts in the code will often break core functionality and have a negative knock-on effect on other modules.
- There is no *one size fits all* approach to module development and you will quite often have to write more code to *hack* the module to meet your requirements.

## Drupal
[Drupal](http://www.drupal.org) is a popular Open-source content management platform which started life in 2001 as a discussion forum. It is the classic example of an *out of the box* solution with a large and complex core which is driven by module based development.

From taking on my first and only Drupal project, these are the experiences I had:

- The learning curve was very steep and new developers would have a hard time adjusting to how things work.
- The methods used to get things working were quite often confusing and unorthodox.
- The admin interface was bewildering and unintuitive.
- The size of the database often exceeded two hundred MySQL tables. Performance on development environments was very slow as a result.
- The output of the HTML from the views module was complex and had many unnecessary nested tags.
- Styling was very diffifcult given that template names would differ between environments and developer machines.
- It was often the case where PHP source code would need to be pasted into a web form or generated from within the system. This made version control impossible.
- Matching environments on different developer machines was a huge task.
- Minor upgrades would break some core modules and require version rollbacks.
- Major upgrades were impossible without sourcing working modules and rewriting code.
- The hook and callback set up makes unit and integration testing very difficult.

## The learning curve
Given the size of Drupal as a framework and the ad-hoc nature of its module system, it can be very difficult to figure out how things work especially when modules have overlapping functionality.

Finding the solutions to common problems was very tough given the fragmented nature of the platform API docs and the different versions for each module. 

The approaches to problems being discussed within the community would almost be invalidated with each subsequent release of the platform.

Given the size of the core and the number of SQL tables required for a simple install, debugging was a very time-consuming task.

There were certain configuration views in the administrator control panel with more than thirty checkboxes and radio buttons on a page. Forgetting to check one of these would often result in a broken development environment.

## Working with Drupal in general
Drupal is chosen as the platform of choice because people see it has something that has most of the functionality that you need already built in. It could be described as a highly opinionated platform. 

This means that when you work with it, you really need to stick to the way that it does things. It's like building a house with a series of completed walls and chipping away at those walls to make sure they fit the way you want them to.

To prevent users from modifying core functionality, Drupal had a series of hooks and callbacks that would fire based on an action the user had taken.  This had to be configured by the developer. This is where problems would arise if you forgot to tick a box in the admin interface and clear your cache.

The views module would output the following HTML to render a simple list of items:

```
<div class="grid grid-12 outer-grid">
	<div class="region-inner">
		<div class="block block-block block-11 block-block-11" id="block-11">
			<div class="block-inner">
				<h2 class="block-title">
					A list
				</h2>
				<div class="content">
					<ul>
						<li class="pre-item-1">
							This 
						</li>
						<li class="pre-item-1">
							is 
						</li>
						<li class="pre-item-1">
							a 
						</li>
						<li class="pre-item-1">
							simple 
						</li>
						<li class="pre-item-1">
							list 
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
```

There is too much nesting taking place here and the HTML is littered with unnecessary classes. This makes styling the above content very tricky, especially when it comes to targeting this particular list for styling.

The `class` and `id` attributes of the elements would be derived from the ID of the generated block in the database and would invalidate styles on different developers machines and environments.

The exact same result could be achieved using the much cleaner example as follows:

```
<ul class="list-of-items">
	<li>
		This 
	</li>
	<li>
		is 
	</li>
	<li>
		 a
	</li>
	<li>
		simple 
	</li>
	<li>
		list
	</li>
</ul>
```

## The marriage of content and presentation
Drupal describes content items and their properties as *entities*. If you think about something like a blog post at the very basic level, it has a title, a date and some text content. 

It also has an author, which is another entity that has a first and last name. You can see here what entities are and how they are connected.

Entities in Drupal needed to be defined within the admin interface. New entities would be described by filling out text fields and checking tickboxes to describe their fields and their relationships to other entities.

This approach made it very difficult to synchronise entities between different environments. Because the definitions were stored in the database, migrations and versioning were non-existent.

In traditional MVC based frameworks and platforms, entities and their relationships would be modelled from within the code, making it easier to track them and take care of migrations.

With the entities and views tightly coupled, it can be difficult to render the content you need in the correct place. Drupal is also a full-stack framework meaning that the server and client-side logic is very tightly coupled.

## What are the alternatives?
I have worked with many frameworks for content managed websites, especially for those where importance was placed on user roles, access control, authentication flows and complex content management.

My preferred approach is to choose a non-opinionated framework that offers the right balance of commonly used utilities and a basic guide for structuring your application. 

The framework should have a small footprint, provide guidance on best practices and leave the rest of the architecture design up to the developer.

The more modern MVC (Model, View, Controller) frameworks I have used, such as [Django](https://www.djangoproject.com/), [CodeIgniter](https://www.codeigniter.com/) and [ExpressJS](https://expressjs.com/) are all minimal, flexible and easy to maintain.

With these frameworks, the functionality of the site or application is never stored in database tables and the database footprint is well modelled, intuitive and small.

Their upgrade paths are much more forgiving to deal with, with smaller iterative updates that won't break your application. This is very important for addressing security vulnerabilities.

## Wrap up
The purpose of this article was to highlight the potential pitfalls of development using a module based framework as opposed to the more modern MVC approach. 

I believe that a developer with a lot of experience working with Drupal would be able to address some of the observations raised here, but they would need to have years of experience and tens of projects under their belt to do this.

It would be unfair to say that the creators of Drupal didn't know what they were doing. Drupal was created in 2001 and was quite innovative for its time, but trying to get an old architecture to fulfill the demands of modern websites is a very tall task in itself.

























