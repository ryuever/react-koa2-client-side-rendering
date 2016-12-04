/* eslint-disable consistent-this */
function throttle(fn, wait = 300) {
  let context, args, ret, timeoutID; // caching
  let last = 0;

  return function throttled(...options) {
    context = this;
    args = options;
    const delta = Date.now() - last;
    if (!timeoutID) {
      if (delta >= wait) {
        call();
      } else {
        timeoutID = setTimeout(call, wait - delta);
      }
    }

    return ret;
  };

  function call() {
    timeoutID = 0;
    last = Date.now();
    ret = fn.apply(context, args);
    context = null;
    args = null;
  }
}

export default throttle;

/* eslint-enable consistent-this */
