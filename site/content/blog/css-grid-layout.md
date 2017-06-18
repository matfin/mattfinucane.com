---
title: "CSS grid layout"
description: "An overview of how I built my photography website using CSS grid layout."
synopsis: "I built a new photography website using the CSS grid layout framework."
date: "2017-06-18"
author: "Matt Finucane"
identifier: "blog"
sponsored: false
disqus: true
uniqueid: 2821792310
categories:
- Hugo
- Docker
- CircleCI
- Gulp
- CSS Grid
---

## Introduction
In this post, I will talk about my experiences in building my photography website, [Cinematt](https://cinematt.photography). The approaches taken to build this site are largely experimental and I used many new techniques to solve the challenges I had encountered. 

This website was built using the CSS grid layout framework, which is used to divide the content on a page into two-dimensional layout regions.

I also used the HTML5 `<picture>` element to load responsive images for all devices. This means I can load appropriately sized images for different devices and deliver the best mix of quality and speed in loading them.

**Note:** This blog post is not an exhaustive exploration of CSS. For this, I recommend checking out [Grid by Example](https://gridbyexample.com/) by [Rachel Andrews](https://rachelandrew.co.uk/) and [A complete guide to grid](https://css-tricks.com/snippets/css/complete-guide-grid/) by Chris House.

## CSS grid layout
CSS Grid layout will soon be the new standard for laying out content on a page. It will supplant older layout techniques such as flexbox, float and table, all of which are based on a one-dimensional axis.

When specifying a grid based layout in CSS, you are setting the two-dimensional content regions for a container and specifying how the children of the container should be laid out. 

You do this by setting two properties, namely `grid-template-rows` and `grid-template-columns`.

The following examples in HTML and CSS illustrate this:

```
<main class="container">
	<article>
		This is some content for the article.
	</article>
	<aside>
		And this goes in the side.
	</aside>
	<footer>
		This should go underneath the above two.
	</footer>
</main>
```

We will start out by setting up the container, which will tell the browser the regions available so the `<article>`, `<aside>` and `<footer>` elements can be placed.

```
.container {
	display: grid;
	grid-template-columns: repeat(4, 1fr); 
	grid-template-rows: auto auto;
	grid-row-gap: 32px;
}
```

Here is what we have done with the above:

- setting `display: grid;` will set the container up as a grid container.
- `grid-template-columns: repeat(4, 1fr);` will create four columns of equal width that the child elements will occupy.
- `grid-template-rows: auto auto` will create two columns that will shrink and grow according to the size of the content inside them.
- `grid-row-gap: 32px` will create a gap between each of the child elements on the y axis - something similar to setting `margin-top` or `margin-bottom` but with a much cleaner solution.

Now what we have our parent container set up, we can work on laying out the child elements. Given that we have four horizontal columns and two vertical rows, we would use the following to lay the `<article>` and `<aside>` elements beside each other, with the `<footer>` being placed directly undereath them.

```
.container article {
	grid-column: 1 / 4;
	grid-row: 1 / 2;
}

.container aside {
	grid-column: 4 / 5
	grid-row: 1 / 2;
}

.container footer {
	grid-column: 1 / 5;
	grid-row: 2 / 3
}
```

This is what is happening with the `<article>` child element:

- setting `grid-column: 1 / 4;` will tell the `<article>` element to occupy three of the four columns of the parent container `<section>`.
- setting `grid-row: 1 / 2;` will also tell the `<article>` element to occupy the top row of the parent container `<section>`.

Likewise, this is what is happening to the `<aside>` child element:

- setting `grid-column: 4 / 5;` will tell the `<aside>` element to occupy the last of the four columns of the parent container `<section>`.
- setting `grid-row: 1 / 2;` will tell the `<aside>` element to occupy the same top row of the parent container `<section>`.

Finally, with the footer we have the following:

- setting `grid-column: 1 / 5;` will tell the footer element to occupy all four columns set out by the parent container `<section>`.
- setting `grid-row: 2 / 3;` will place the footer at the bottom row of the parent `<section>` element. This puts it underneath the `<article>` and `<aside>` elements.






