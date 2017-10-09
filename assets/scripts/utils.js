export const isValidChild = (child) => {
  return (
    (child.nodeType === 1 || child.nodeType === 3) &&
    child.textContent.trim().length > 0
  );
};

export const getLetters = (node, letters = []) => {
  const filtered_nodes = [...node.childNodes].filter(isValidChild);

  filtered_nodes.forEach((filtered_node) => {
    if (filtered_node.nodeType === 3) {
      letters.push({
        append_to: node,
        letters: filtered_node.textContent.trim().split('')
      });
    } else {
      getLetters(filtered_node, letters);
    }
  });

  return letters;
};

export const deviceParameters = () => {
  const width = (window.innerWidth || document.documentElement.clientWidth);
  const height = (window.innerHeight || document.documentElement.clientHeight);
  const pixel_ratio = Math.ceil(window.devicePixelRatio || 1);

  return {
    width,
    height,
    pixel_ratio
  };
};

export const getVideoParams = () => {
  const device = deviceParameters();
  const	breaks = [
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
  const min_cb = (prev, curr) => {
    return Math.abs(curr.width - device.width) < Math.abs(prev.width - device.width) ? curr : prev;
  };
  const breakpoint = breaks.reduce(min_cb);

  breakpoint.pixel_ratio = device.pixel_ratio;

  return breakpoint;
};

export const primeTapEvent = (selector, fn) => {
  const items = [...document.querySelectorAll(selector)];

  items.forEach(item => {
    if ('onpointerdown' in document) {
      item.addEventListener('pointerdown', fn);
    } else if ('ontouchstart' in document) {
      item.addEventListener('touchstart', fn);
    } else {
      item.addEventListener('click', fn);
    }
  });
};

export const throttle = (fn, limit = 200) => {
  let waiting = false;

  return () => {
    if (!waiting) {
      fn.call();
      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};
