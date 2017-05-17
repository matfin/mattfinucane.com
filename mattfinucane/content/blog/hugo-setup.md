---
title: "Building this site - Hugo"
description: "Part two in this series explores Hugo, a static site generator."
synopsis: "In part two of this series we take a more in depth at Hugo - a static site generator."
date: "2017-05-11"
author: "Matt Finucane"
identifier: "blog"
sponsored: false
disqus: true
uniqueid: 4051171472
categories:
- Hugo
- Docker
- CircleCI
- Gulp
---

## Hugo
As previously mentioned in the [first part](/blog/building-this-site) of this series, [Hugo](https://gohugo.io) is a static site generator. 

This means that it reads in a combination of Markdown content and HTML templates and combines them to generate a site.

## Structural outline
Hugo has the following as a basic requirement for how to structure your site. 

This setup is quite strict and is the only 'opinionated' part of the framework. 

It can be quite tricky to get working for beginners. I know I was caught out a few times but this setup is working for me now.

## Exploring archetypes
If your content deviates from the standard attributes provided by Hugo (which it will) then you will need to set up a content type inside the `archetypes/` directory.

Below is an example of an archetype I set up for a project (`archetypes/project.md`):

```
---
title:			""
description:		""
synopsis:		""
liveurl:		""
date:			""
duration:		""
identifier:		""
languages:		[]
frameworks:		[]
infrastructure:		[]
tools:			[]
---
```

## Exploring content
Given the above `archetype` of project, I now need a place to put all the content for projects. 

This should go inside the `content/projects/` directory and be given a URL friendly name which Hugo will map to a generated URL.

A content file looks like something that contains YML formatted metadata at the top and Mardown underneath.

This metadata and content is pulled out for rendering in the templates later. An example of what this looks like is below (`content/projects/my-project.md`):

```
---
title: 			"My project"
description:		"Project description."
synopsis:		"A small synopsis"
date:			"2012-04-01"
duration:		"60 days"
identifier:		"projects"
languages: 		
- Javascript (ES5)
frameworks:
- MVC 1.0
infrastructure:
- Docker
tools:
- Gulp
---

## Heading

This is where you put your content in **Markdown format**.

```

Given the above setup, you would navigate to `http://mywebsite.dev/projects/my-project` to see the rendered result, provided you have your templates set up correctly.

**Note:** It's important that the name of an archetype matches the subdirectory name inside `content/`. In this case, the arcehtype for `project.md` matches up to `content/projects`. This is how Hugo knows what your content looks like and where to find it.

The Hugo docs have an overview of this in their content docs which they call [front matter](https://gohugo.io/content/front-matter/).

## Exploring layouts
This directory contains the HTML for the list, detail and card layouts for each of your content types. It also contains what are called `partials` - snippets of HTML code that are included in several sections of the site, such as headers and footers.

If you have a content type called `project` and you have some content inside `content/projects/`, you would need the following layout setup for it.

- `mattfinucane/layouts/projects/single.html` contains the HTML to render the content and metadata for a single project - a detail view.
- `mattfinucane/layouts/projects/card.html` contains the HTML to display a single card - a small summary view that would appear in a list.
- `mattfinucane/layouts/projects/list.html` is the list view that renders a list of project cards.

## The single template
A single template acts as the detail view for content. Its HTML should look like the following.

```
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode }}">
	<head>
		{{ partial "head" . }}
	</head>
	<body>
		<div class="wrapper background-dark-green">
			{{ partial "header" . }}
		</div>
		<div class="wrapper background-dark-green">
			{{ partial "teaser" . }}
		</div>
		<div class="wrapper">
			<div class="page project">
				{{ .Content }}
			</div>
		</div>
		<div class="wrapper">
			{{ partial "footer" . }}
		</div>
		{{ partial "scripts" .}}
	</body>
</html>
```

We can break down the above example as follows:

- `{{ .Site.LanguageCode }}` is a global site configuration parameter. These are set up inside `mattfinucane/config.yml` and we will go over this later on in this post.
- `{{ partial "head" . }}` will inline the HTML from the `mattfinucane/layouts/partials/head.html` file and inline its contents. The `.` shifts the context for the page metadata into the `head` partial so we can populate the SEO metadata tags correctly.
- `{{ partial "header" . }}` pulls in and inlines the HTML for the header partial, which contains the site title and navigation.
- `{{ partial "teaser" . }}` calls on another partial I have created for stage teasers with the `.` passing in the context for the page metadata to the partial. We can access the metadata for the content inside this partial to pull things out such as the title and description.
- `{{ .Content }}` will inline the HTML that is generated from the Markdown content inside the content markdown file.
- `{{ partial "footer" }}` is the partial for the footer.
- `{{ partial "scripts" }}` is the partial for including the Javascript assets we need for the site, loaded just before the end `<body>` tag.

From the above, you will start to see how Hugo puts together the content and templates for a site as HTML. Read more about Hugo [templates](https://gohugo.io/templates/overview/).

## The list template
The list template is fairly self explanatory and it looks as follows:

```
<div class="wrapper">
	<div class="page projects">
		{{ .Content }}
		<ul class="projects-list">
			{{ range where .Data.Pages "Section" "projects" }}
				<li>
					{{ .Render "card" }}
				</li>
			{{ end }}
		</ul>
	</div>
</div>
```

Here, we are using the built-in `range` function to go through each `page` that belongs to the `section` `projects` and then call the `.Render` function passing in `card` as an argument. Hugo will know that it needs to load the `layouts/projects/card.html` template.

When calling the render function for the project card template inside the `range` function, the card will have access to the data for the current project inside the loop. This is the magic of Hugo and it looks like the following:

```
<a class="project-card" href="{{ .Permalink }}">
	<h3>
		{{ .Title }}
	</h3>
	<p>
		{{ .Description }}
	</p>
</a>
```

## A note on adding content to list templates
One item I was stuck on for quite some time was when trying to add content to list templates. For a list of projects, for instance, I wanted to include some extra content such as a title and a small paragraph of text.

If you want something similar, what you need to do is add an `_index.md` file to the content subdirectory and place your content in there. For my set up, I had the following file `mattfinucane/content/projects/_index.md` which contains the following:

```
---
title: 		"Selected projects"
description:	"Some selected projects from my portfolio"
identifier:	"projects"
---
```

With this, I was able to include this metadata on the project listing page and render it inside the stage teaser.

## Shortcodes
Shortcodes are a mechanism that Hugo uses to include rich content inside your Markdown content. Markdown is very good at turning your basic content into clean HTML but this can get tricky if you want to include anything more complicated than a heading, list or paragraph.

In my case, I wanted to be able to write some standard content, then render a list of skills and then add more content. I did this by creating the following (`layouts/shortcodes/taxonomies.html`):

```
{{ $which 	:= .Get "items" }}
{{ $items	:= where .Site.Pages "Section" $which }}
<ul class="taxonomies-list">
	{{ range sort $items ".Params.proficiency" "desc" }}
		{{ if .Params.proficiency }}
			<li>
				{{ .Render "card" }}
			</li>
		{{ end }}
	{{ end }}
</ul>
```

I then call this from inside my markdown content as follows:

{{`< taxonomies items="languages" >`}}

## The public/ directory
This is where Hugo dumps the code for the generated site once it has been built. 

## The static/ directory
This is where assets such as images and svgs, styles and scripts go. You could add your source code in here and Hugo will pick it up immediately. What I do is keep my source code elsewhere and copy contents over here once they have been concatenated and minified using a Javascript based task runner. I will cover this in more detail in a post later as part of this series.

## Configuration files
Hugo loads the site-wide configuration info from a `mattfinucane/config.yml` file. This contains info such as the base URL for the site, the title, menu items, taxonomies and other custom configuration parameters. For this project, I have configuration files set up for my local development environment, one for a local build, one for the staging environment and one for the production environment.

As far as I am aware, there is no way to create an abstract configuration file with common properties and allow other files to inherit settings from that.

## A note on taxonomies
Hugo provides the ability to specify taxonomies and terms for these. For this website, I wanted to be able to list my technical skills and group them according to the tools I use, the infrastructure, the languages and frameworks.

This snippet from my Hugo config file details these as follows:

```
taxonomies:
  language:       "Languages"
  framework:      "Frameworks"
  infrastructure: "Infrastructure"
  tool:           "Tools"
  category:       "Categories"
```

When adding the content for a new project, I wanted to be able to tag the taxonomies for it so I could associate the two and create filters. If I am on a content page for a skill, I want to be able to show the projects I used that skill for.

Likewise, when I am looking at the content for that project, I want to list all the skills I used for it. Alongside that, I also wanted to be able to create content for each taxonomy term I had added to a project, because I wanted to be able to elaborate on that skill.

Since Hugo doesn't offer a way to do this out of the box, I created archetypes for each of the taxonomies shown above, and I added content for each taxonomy term.

Inside the `mattfinucane/content/` directory for this project, I have subdirectories for `languages/`, `projects/`, `tools` etc. This means I can now add rich content for each taxonomy term while being able to link the term to a project.

## Wrapping up
This article provides an in-depth overview of how I understand Hugo works. For more information, it's always useful to check out [their docs](https://gohugo.io/overview/introduction/) which are improving all the time. 

In [part three](/blog/hugo-docker-setup) I will go into more detail on how I got my development environment set up for this project.



