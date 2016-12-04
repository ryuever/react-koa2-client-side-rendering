export default function getNodeOffset(element) {
  let clientRect = [];
  let offsetLeft = 0;
  let offsetTop = 0;
  let offsetRight = 0;
  let offsetBottom = 0;
  if (typeof element.getBoundingClientRect === 'function') {
    clientRect = element.getBoundingClientRect();
    const { left, right, bottom, top } = clientRect;
    const { pageXOffset, pageYOffset } = window;

    offsetLeft = left + pageXOffset;
    offsetRight = right + pageXOffset;
    offsetBottom = bottom + pageYOffset;
    offsetTop = top + pageYOffset;
  } else {
    offsetLeft = element.offsetLeft;
    offsetRight = element.offsetLeft + element.offsetWidth;
    offsetBottom = element.offsetTop + element.offsetHeight;
    offsetTop = element.offsetTop;

    let ele = element;
    while ((ele = ele.offsetParent)) {
      offsetLeft += ele.offsetLeft;
      offsetRight += ele.offsetLeft;
      offsetTop += ele.offsetTop;
      offsetBottom += ele.offsetTop;
    }
  }

  const pos = {
    left: offsetLeft,
    top: offsetTop,
    right: offsetRight,
    bottom: offsetBottom,
  };
  return pos;
}
