if(window.mf_site == null) {
	window.mf_site = {};
}

window.mf_site.video = {

	/**
	 *	This function returns parameters needed to load
	 *	a video of the correct size, given the screen.
	 *	We read in the device screen parameters and return
	 *	the most suitable breakpoint.
	 *	
	 *	@function	getVideoParams
	 *	@return 	{Object} 	- breakpoint, with video size and screen pixel ratio
	 */
	getVideoParams: () => {
		let device = mf_site.utils.deviceParameters(),
			breaks = [
				{
					width: 320,
					wide: false
				},
				{
					width: 640,
					wide: false
				},
				{
					width: 768,
					wide: false
				},
				{
					width: 1024,
					wide: false
				},
				{
					width: 1280,
					wide: true
				},
				{
					width: 1600,
					wide: true
				}
			];

		let min_cb = (prev, curr) => Math.abs(curr.width - device.width) < Math.abs(prev.width - device.width) ? curr : prev,
			breakpoint = breaks.reduce(min_cb);

		breakpoint.pixel_ratio = device.pixel_ratio;

		return breakpoint;
	},

	/**
	 *	This function takes in a reference to a 
	 *	DOM node for a video element, and sets the 
	 *	correct video parameters given a calculated
	 *	breakpoint. The video is then played.
	 *
	 *	@function	setVideo
	 *	@param 		{HTMLElement} 	- the DOM node for the video element
	 */
	setVideo: (video) => {
		let breakpoint 	= mf_site.video.getVideoParams(),
			video_base 	= video.getAttribute('data-base-url'),
			video_name	= video.getAttribute('data-video'),
			video_width = breakpoint.pixel_ratio * breakpoint.width,
			poster_name	= video.getAttribute('data-poster'),
			append		= breakpoint.wide ? '-wide':'',
			media_src 	= `${video_base}/w_${video_width > 1920 ? 1920 : video_width},br_3m/${video_name}${append}`;

		let formats = [
			{
				ext: 'webm',
				type: 'video/webm'
			},
			{
				ext: 'mp4',
				type: 'video/mp4'
			},
			{
				ext: 'ogv',
				type: 'video/ogg'
			}
		];

		video.setAttribute('poster', `${media_src}.jpg`);

		Array.prototype.forEach.call(formats, (format) => {
			let source = document.createElement('source');
			source.setAttribute('src', `${media_src}.${format.ext}`);
			source.setAttribute('type', `${format.type}`);
			video.appendChild(source);
			video.play();
		});
	}

};