import * as utils from './utils';

export const setVideo = (video) => {
  const breakpoint 	= utils.getVideoParams();
  const video_base 	= video.getAttribute('data-base-url');
  const video_name	= video.getAttribute('data-video');
  const video_width = breakpoint.pixel_ratio * breakpoint.width;
  const append		  = breakpoint.wide ? '-wide' : '';
  const media_src 	= `${video_base}/w_${video_width > 1920 ? 1920 : video_width},br_3m/${video_name}${append}`;
  const formats = [
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

  formats.forEach(format => {
    const source = document.createElement('source');

    source.setAttribute('src', `${media_src}.${format.ext}`);
    source.setAttribute('type', `${format.type}`);
    video.appendChild(source);
  });

  video.play();
};

