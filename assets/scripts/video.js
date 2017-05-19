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
	let breakpoint = getVideoParams();
};