---
title: "Building Cinematt with CSS grid layout"
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

Here is a quick overview of what was used to build this site:

- I used the [Hugo](https://gohugo.io/) static site generator and write all my templates in HTML5.
- The grid layout was used for laying out items. I used the [SASS](http://sass-lang.com/) framework to generate CSS.
- For the little bit of Javascript that was needed, I used the ES2015 syntax. I don't transpile this to ES5.
- Deployments are handled using [Circle CI](https://circleci.com/).
- Images are hosted on [Cloudinary](https://cloudinary.com).
- I set my development and local build environments up using [Docker Compose](https://docs.docker.com/compose/).

**Note:** This blog post is not an exhaustive exploration of CSS. For this, I recommend checking out [Grid by Example](https://gridbyexample.com/) by [Rachel Andrews](https://rachelandrew.co.uk/) and [A complete guide to grid](https://css-tricks.com/snippets/css/complete-guide-grid/) by Chris House.

## CSS grid layout
CSS Grid layout will soon be the new standard for laying out content on a page in two dimensions. It will supplant older layout techniques such as flexbox, float and table, all of which are based on a one-dimensional axis.

When specifying a grid based layout in CSS, you are setting the two-dimensional content regions for a container and specifying how the children of the container should be laid out. 

One of the challenges I encountered with this site was how to go about building a grid of image thumbnails, taking into account each image had a different aspect ratio (portrait vs landscape).

I wanted each image thumbnail to be displayed neatly in columns and rows, equally spaced apart and without distortion. Here is how I solved this.

This snippet of HTML shows a number of thumbnail photos:

```
<main class="photos">
	<a class="photo-card orientation-landscape" href="...one.html">
		<figure>
			<img src="...image-one.jpg">
			<figcaption>
				Image one
			</figcaption>
		</figure>
	</a>
	<a class="photo-card orientation-portrait" href="...two.html">
		<figure>
			<img src="...image-two.jpg">
			<figcaption>
				Image two
			</figcaption>
		</figure>
	</a>
	<a class="photo-card orientation-landscape" href="...three.html">
		<figure>
			<img src="...image-three.jpg">
			<figcaption>
				Image three
			</figcaption>
		</figure>
	</a>
	<a class="photo-card orientation-landscape" href="...four.html">
		<figure>
			<img src="...image-four.jpg">
			<figcaption>
				Image four
			</figcaption>
		</figure>
	</a>
</main>
```

I set up the following CSS for the parent `<main>` container.

```
main.photos {
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto;
	grid-column-gap: 8px;
	grid-row-gap: 8px;
}
```

For the main container, I wanted the following:

- The photo thumbnails to be laid out 3 at a time on the horizontal axis. Setting `grid-template-columns: repeat(3, 1fr);` took care of this by dividing the `<main>` container into three horizontal columns.
- Setting `grid-template-rows: auto;` set the photo thumbnails to occupy as much space as they needed on the vertical axis.
- Setting `grid-column-gap` and `grid-row-gap` to 8px created nice and even spacing on both axes between the photo thumbnails.

This set up the `<main>` container to lay out the child elements as they needed to be using a much cleaner approach than what would need to be done with the float or flexbox layout techniques - no more margins to be applied using `nth-child(...)` selectors.

For each child `.photo-card` elements I had the following set up:

```
a.photo-card {
	grid-column: 1;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto minmax(64px, auto);
}

a.photo-card.orientation-landscape {
	grid-row: span 1;
}

a.photo-card.orientation-portrait {
	grid-row: span 2;
}
```

- The photo card should occupy one column with `grid-column: 1;` and have its own grid layout for its child elements.
- If the photo card contains a portrait image, it should occupy two spans of its parent grid layout on the vertical axis. It needs to be taller than it is wide so the image inside is not squashed down.
- If the photo card contains a landscape image, it should only occupy one row and column.
- Both should only ever occupy one column. This is why there different values for `grid-row` and we set `span` to either one or two, so we tell the photo card to occupy one row or two depending on its orientation.

This is where CSS grid layout really shines. I had much more control over the art direction for each photo thumbnail and I was able to display each of them in a nice uniform manner.

Trying to do this with using float or flex layouts would require far greater effort.

## Cloudinary and responsive images
With the layout challenge solved, I needed a clever way to display the photos to make sure they looked good on all devices but did not take too long to download.

This is where responsive images and the `<picture>` element comes in. The `<picture>` element can take multiple image sources and the browser determines the best image to load given the devices screen size and pixel ratio.

To achieve this, I created a partial in Hugo for loading responsive images as follows:

```
<picture class="photo-wide orientation-landscape loaded">
	<source 
		media="(min-width: 1024px)" 
		srcset="image_large.jpg,
		image_large_retina.jpg 2x">

	<source 
		media="(min-width: 640px) and (max-width: 1024px)" 
		srcset="image_medium.jpg,
		image_medium_retina.jpg 2x">

	<source 
		media="(max-width: 640px)"
		srcset="image_small.jpg,
		image_small_retina.jgg 2x">

	<img data-src="image_standard.jpg" alt="Image alt...">
</picture>
```

This is a stripped down example that does the following:

- The `<picture>` element contains the three `<source>` elements and contain a CSS media query to determine the image to load given the screen widths.
- The `srcset` property contains a comma separated list of image urls. The second url in the `srcset` loads a higher resolution image we specify and is denoted by the `2x` value at the end of the final url.
- An  `<img>` element is added as the placeholer for the image. This would be the element that needs to be styled with CSS. You should not try to style the `<source>` elements.

Given the need the same image in a number of different sizes, [Cloudinary](https://cloudinary.com) was an excellent choice because they offer image transforms on the fly.

I generated high resolution images in Photoshop, saved them in lossless Tiff format and uploaded them to Cloudinary. I could then request the image by its unique id and append `w_1280` to the url to fetch an image resized to 1280px with the height determined by the aspect ratio.

Saving a Tiff file also preserves quite a lot of Exif data that is saved to the original image by the camera. Cloudinary provides an extensive API to fetch this data.

Each photo I had processed was uploaded in turn, and I wrote a small tool ([Cloudinary To Hugo](https://github.com/matfin/cloudinary_to_hugo)) to connect to this API and pull down this metadata for each image which I would then use to generate a Yaml formatted markdown file that Hugo uses.

Filling in this data manually for nearly 300 photos would have been a daunting task.

## Performance
I wanted the site to load as quickly as possible and perform well, even though it is a photography website with a lot of image assets. Here is how I went about this.

I used a lazy loading technique to start loading the images only when the main content had rendered. CSS Grid layout allowed me to size the photo cards according to the approximate size they were going to be when the image loaded, so as to minimise problems with FOUC.

FOUC (flash of unstyled content) is where the page rendering process seems quite jumpy during load because the elements have not been sized correctly. This especially becomes a problem when loading images.

Only the images above the fold in the viewport are fetched and rendered. Others are fetched and rendered on scroll.

I used image gradients as placeholder content for each image before it has been loaded. These gradients come from the dominant colours within the image and the Cloudinary API provides these with the metadata for each image fetched.

For scroll events, I wrote a [throttle function](https://github.com/matfin/cinematt/blob/master/assets/scripts/utils.js#L9) which limits the number of times a function can be called over a given timespan. This was necessary because scroll events are fired in rapid succession and need to be controlled.

Given that items can be centered or placed anywhere within a parent grid container, I have been able to cut down on the size of the HTML DOM tree. No more wrapper divs are needed with grid layout.

## Conclusion
I think that the CSS grid layout framework is definitely the future of layouts. It makes tackling layout challenges much easier.

It can be quite tricky to get it working at the start. There is some experimentation needed with the different approaches that can be taken, and the standard has not been agreed upon fully at this time of writing. 

CSS grid is quite well supported and implenented in most modern browsers - the exception being MS Edge where it is a planned feature.

I used it for this website because I wanted to experiment with it and I am very happy with the results. Should you start using it? It depends on who your audience is - it's still quite bleeding edge. 

It is definitely worth learning more about it and experimenting with it. If you want to see the source code for this website then go to the [Github repository](https://github.com/matfin/cinematt).

**Note:** The grid layout I have put together is a little rough around the edges right now, given that this is my first run at using it. I will be refactoring it in several places in the coming days and weeks.







