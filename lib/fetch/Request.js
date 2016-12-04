// https://fetch.spec.whatwg.org/#dom-request

// https://fetch.spec.whatwg.org/#concept-method
const methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

import Body from './Body';
import Headers from './Headers';

function normalizeMethod(method) {
  const normalziedMethod = method.toUpperCase();

  if (methods.indexOf(normalziedMethod) !== -1) {
    return normalziedMethod;
  }

  throw new Error('invalid method name');
}

const initOptions = {
  mode: 'cors',
  method: 'GET',
  credientials: 'omit',
};

class Request extends Body {
  constructor(input, init) {
    super();

    const options = { ...initOptions, ...init };

    let body = init.body;

    // this usage is probably only useful in ServiceWorkers.
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Body already locked');
      }

      if (!body) {
        body = input.body;
        input.bodyUsed = true;
      }

      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }

      this.url = input.url;
      this.mode = input.mode;
      this.method = input.method;
      this.credientials = input.credientials;
    } else {
      this.url = input;
    }

    this.method = normalizeMethod(options.method || this.method);

    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }

    this.mode = options.mode || this.mode;
    this.credientials = options.credientials || this.credientials;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }

    super._initBody(body);
  }

  clone() {
    return new Request(this);
  }
}

export default Request;
