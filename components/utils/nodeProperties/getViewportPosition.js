export default function getViewportPosition() {
  const scrollTop = window.pageYOffset
                    || document.body.scrollTop
                    || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset
                     || document.body.scrollLeft
                     || document.documentElement.scrollLeft;
  const viewportWidth = window.innerWidth
                     || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight
                     || document.documentElement.clientHeight;

  const top = scrollTop;
  const left = scrollLeft;
  const bottom = viewportHeight + scrollTop;
  const right = viewportWidth + scrollLeft;

  return {
    left,
    top,
    right,
    bottom,
  };
}
