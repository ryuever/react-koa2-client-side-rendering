/* eslint-disable consistent-return */
import query from 'lib/query';

const bind = window.addEventListener ? 'addEventListener' : 'attchEvent';
const unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
const prefix = (bind === 'addEventListener') ? '' : 'on';

const on = (elem, type, fn, capture = false) => {
  const selector = typeof elem === 'string' ? query(elem) : elem;

  if (!selector) {
    return;
  }

  type.split(' ').forEach(item => selector[bind](prefix + item, fn, capture));
  return fn;
};

const off = (elem, type, fn, capture = false) => {
  const selector = typeof elem === 'string' ? query(elem) : elem;

  if (!selector) {
    return;
  }

  type.split(' ').forEach(item => selector[unbind](prefix + item, fn, capture));
  return fn;
};

const event = { on, off };

export default event;

/* eslint-enable consistent-return */
