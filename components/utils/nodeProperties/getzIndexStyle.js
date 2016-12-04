/* eslint-disable consistent-return */
export default function getzIndexStyle(targetNode) {
  if (!targetNode) {
    return;
  }

  const zIndexMax = 2147483647;
  let zIndex = null;
  let ret = zIndex;
  let baseNode = targetNode;
  const body = document.getElementsByTagName('body')[0];

  const isNumberLike = (obj) => {
    return /^[0-9]+$/.test(`${obj}`);
  };

  const toValidzIndex = (val) => {
    if (parseInt(val, 10) > zIndexMax) {
      return `${zIndexMax}`;
    }
    return val;
  };

  while (baseNode !== body) {
    baseNode = baseNode.parentNode;
    zIndex = getComputedStyle(baseNode).zIndex;
    if (isNumberLike(zIndex)) {
      ret = toValidzIndex(`${parseInt(zIndex, 10) + 1}`);
    }
  }
  return ret;
}
/* eslint-enable consistent-return */
