const deviceParameters = () => {
	let width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

	let height = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

	let pixel_ratio = Math.ceil(window.devicePixelRatio || 1);

	return {
		width: width,
		height: height,
		pixel_ratio: pixel_ratio
	};
};

const getVideoParams = () => {
	let device = deviceParameters(),
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

	return Object.assign(breakpoint, {pixel_ratio: device.pixel_ratio});
};

const setVideo = (video) => {
	let breakpoint 	= getVideoParams(),
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
};