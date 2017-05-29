---
title: "Approaches to modern web development"
description: "This article provides tips for good modern web development."
synopsis: "I talk about some caveats and provide tips to create and maintain modern web applications."
date: "2017-05-24"
author: "Matt Finucane"
identifier: "blog"
sponsored: false
disqus: true
uniqueid: 4051171474
categories:
- Javascript
- PolymerJS
- MeteorJS
---

## Introduction
When it comes to building web applications, I have been using single page Javascript based frameworks. In this article I will cover their basic concepts, benefits and drawbacks.

## What are single page applications?
To explain this, I first need to explain how traditional web applications have always worked.

In the traditonal sense, a full stack server side application always needed to generate all the data for a website on the server, then send this down to the client before the page could be rendered.

Content would be fetched from a database, passed through a controller and then merged with a view template before it was sent.

This would manifest itself in the form of the page reloading each time you navigated a website or application. Javascript had a minimal role and was responsible for controlling small parts of the UI. 

Five years ago, single page applications started becoming more popular. A single page application makes a request to the server for a skeleton of a HTML file, along with scripts and styles. 

Subsequent requests are made to the server in the form of Ajax requests. The HTML content of the page itself is rendered using Javascript and styled with CSS. 

As we navigate the site we only fetch a subset of the content we need as opposed to the entire page, meaning a faster UI and less server load.

These are the most popular Javascript based single page application frameworks:

- [PolymerJS](https://www.polymer-project.org/) which is a client side framework and wrapper for [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
- [MeteorJS](https://www.meteor.com) is a full stack framework backed by NodeJS and MongoDB. It uses Blaze, Angular and React for templating.
- [ReactJS](https://facebook.github.io/react/) is a componentised client side library for building web applications.
- [EmberJS](https://www.emberjs.com/) is a client side library for building web applications and uses the Handlebars templating engine.
- [AngularJS](https://angularjs.org/) is another client library that attaches to static HTML with a set of its own attributes for data binding.

Single page applications create boundaries between content, presentation and logic. For MVC frameworks, the whole point is separation of concerns. Loosely coupled components are easier to maintain.

Content is usually delivered in [JSON](www.json.org/) format using [REST](https://en.wikipedia.org/wiki/Representational_state_transfer).

Presentation is controlled by HTML templates that contain templating tags to carry out common tasks such as iterating over a dataset. 

Controllers are responsible for handling requests and sending data back to the application. These requests are handled using HTTP and WebSockets.

## A small server side example
To demonstrate how this all works, this small example shows how we would fetch and render a list of users. 

Let's start with the `server side controller` which will fetch the users and return a list of them in JSON format.
```
/**
 *	Users controller (NodeJS)
 */
const app = express(),
	
/**
 *	This function fetches users
 *	from the MongoDB collection
 */
const fetchUsers = (offset = 0, limit = 10) => {
	return new Promise((resolve, reject) => {
		Users.find({}, {
			$offset: offset,
			$limit: limit
		}).then((result) => {
			if(error) {
				reject(error);
			}
			else {
				resolve(result);
			}
		});
	});
};

/**
 *	This function returns a list
 *	of users in JSON format.
 */
app.get('/admin/users', (request, response) => {
	fetchUsers()
	.then((result) => {
		response.status(200).json(result);
	})
	.catch((error) => {
		response.status(500).json(error);
	});	
});
```

If we make a request to the server to fetch some users from `https://my-server/admin/users` then we should expect the following response:

```
[
	{
		"name":"Matt",
		"location":"Berlin"
	},
	{
		"name":"Joe",
		"location":"Dublin"
	},
	{	"name":"Phil",
		"location":"London"
	},
	{	"name":"Damien",
		"location":"Toulouse"
	}
]
```

## How things work client side
If we were using a client side controller, it would look something like this:

```
Template.users = {
	/**
	 *	Array to store a list 
	 *	of users.
	 */
	users: [],

	/**
	 *	This is an event that fires
	 *	when a template is ready.
	 */
	ready: () => {
		fetchUsers();
	},

	/**
	 *	Make an AJAX request to 
	 *	fetch a list of users.
	 */
	fetchUsers: () => {
		let request = new XMLHttpRequest(),
			url 	= 'https://my-server/admin/users'

		/**
		 *	We make the request...
		 */
		request.open('GET', url, true);

		/**
		 *	When the request has completed...
		 */
		request.onload = () => {
			/**
			 *	We check the response status code
			 *	to make sure everything worked ok...
			 */
			if(request.status === 200) {
				/**
				 *	Then we assign the response 
				 *	to the list of users.
				 */
				this.users = JSON.parse(request.responseText);
			}
		};
	}
};
```

To render a user, we would need to create a template for them that could look like the following:

```
<template name="user">
	<li>
		{{ name }} is in {{ location }}.
	</li>
</template>
```

Our view template to render a list of users might look like this:

```
<html>
	<head>
		<title>
			Single Page Application | Users
		</title>
	</head>
	<body>
		<ul class="list-of-users">
			{{ each users }}
				{{> user }}
			{{ end }}
		</ul>
	</body>
</html>
```

When the browser has initially rendered the template, it calls on the controller for that template to fetch the users. When the users have been fetched they are automatically rendered into a list.

## Concepts of single page applications
Here we will cover the basics of some of the concepts you will see if you are new to client side Javascript development.

### Controllers
In client side development, a controller is responsible for the managing the data between a server and the view it is attached to. It also contains functionality to deal with UI behaviours.

### Templates
Templates are HTML files that contain special tags to make it easier to render content. Standard HTML does not deal with rendering content in loops which makes sense considering it's not a language but a markup for presenting content.

### Views
Templates and views are almost the same, but a view is the overall collection of different component templates that are put together the whole page.

### Binding
Binding is a process where rendered content in a view updates automatically when the data inside the controller for that view changes. This is a feature provided by all of the frameworks mentioned above and is very useful, because it means we do not need to write code to make complex DOM queries and update HTML nodes.

### Routing
Navigating around an application does not reload the page, but there is still the need to deep link in to the different views. This is where client-side routing comes in - using a feature called HTML5 [pushState](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

### Ajax requests
Ajax is a set of techniques that facilitate requests to a server to fetch fresh data without having to reload a page. It has been widely used since 2006 and without it, there would be no single page applications.

### WebSockets
WebSockets are an API used to establish persistent connections between a browser and web server, in contrast to the HTTP protocol which requests data and then disconnects. 

This is very useful and efficient for real time applications because two way communication eliminates the need for polling the server at a timed interval to check for fresh data. 

## Advantages of single page application frameworks

- Refreshing data without having to make a round trip to the server is good for UI responsiveness and server load.
- Most of these frameworks offer basic utilities to take the donkey-work out of common tasks (such as date formatting). This means you can do more with less code.
- More modern development techniques enforce or at least encourage good development practices. This makes testing and maintenance easier.
- The frameworks listed above are all Open-source and have thriving communities so finding the solution to a problem is easier.

## Any drawbacks?
While they are maturing nicely, there can be some drawbacks to creating single page applications as follows:

- SEO can be an issue, because most search engine bots cannot execute Javascript code. All they see when they crawl your application is an empty `<body>` tag with no content inside it. To address this, you can use a service called [Prerender.io](https://prerender.io) which will fetch your page, execute the Javascript on it, wait for everything to render and then deliver that content to search bots.
- Given all the client side logic is separated out from the server, the initial hit on loading times can be quite high. This is especially an issue for mobile devices. Try to cut down on the number of external dependencies your application uses and load essential content first, then other content afterward.
- Single page applications can be slower on older browsers. Their Javascript engines are not as fast as those in modern browsers.

## Do's and don'ts

- Don't be tempted to install plugins for everything you are trying to do. Your application will be bloated and take too long to load. 
- From the above point, write Javascript using the ES7 standard and use [BabelJS](http://babeljs.io/) to transpile it for older browsers.
- Use a task runner such as [Gulp](http://gulpjs.com/), [Grunt](https://gruntjs.com/) or the [webpack](https://webpack.github.io/) module loader to concatenate and minify your scripts. Some frameworks will come with packaging tools to handle this for you.
- A large number of small and simple functions is much better than having a small number of very large functions.
- Make use of the latest Javascript standards and avail of [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), [generator functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*), [arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and the various [Array prototype functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). These features will make code much easier to write, maintain and test.
- When choosing a module check its Giuhub repository to see how often it is updated, how much support it has and how well documented it is.
- When you go live, use HTTP/2 and HTTPS to deliver your content. Follow these excellent tutorials to serve content over [HTTP/2 with nginx](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-16-04) and to secure your content with [Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04).
- Need an external service to connect to your local development machine? Set up a free secure HTTP tunnel using [ngrok](https://ngrok.com/).
- Use [Docker Compose](https://docs.docker.com/compose/) when setting up your development environment. This will preserve your developent set up and it won't fall over when you do something like upgrade your operating system. I have covered this in my blog post about using [Docker for development](/blog/hugo-docker-setup).
- Use [CircleCI](https://circleci.com) for continuous integration. I have written about [using CircleCI](/blog/hugo-deployment) for my set up.

## Wrap up
In this article, we have listed the most popular Javascript frameworks and explored the basic concepts surrounding what they all have in common. Out of the above frameworks, I found that [MeteorJS](https://www.meteor.com) and [PolymerJS](https://www.polymer-project.org/) were the nicest to work with and I would highly recommend them.

If you want to see an example of a single page application written in MeteorJS, you could check out the code for [one of my Meteor projects](https://github.com/matfin/annachristoffer/tree/v1.0.0).


