// https://fetch.spec.whatwg.org/#dom-response

import Body from './Body';
import Headers from './Headers';

// https://fetch.spec.whatwg.org/#redirect-status
const redirectStatus = [301, 302, 303, 307, 308];

const responseInit = {
  status: 200,
  statusText: 'OK',
  body: null,
  type: 'default',
};

class Response extends Body {
  constructor(body, init = responseInit) {
    super();

    if (init.status < 200 || init.status >= 599) {
      throw new RangeError('Invalid response status code');
    }

    const { status, statusText, headers, url } = init;

    this.status = status;

    // https://fetch.spec.whatwg.org/#ok-status
    this.ok = status >= 200 && status < 300;
    this.statusText = statusText;
    this.headers = headers instanceof Headers ? headers : new Headers(headers);
    this.url = url;

    super._initBody(body);
  }

  // Creates a clone of a Response object.
  clone() {
    const { status, statusText, headers, url } = this;
    return new Response(this._bodyInit, {
      status,
      statusText,
      headers: new Headers(headers),
      url,
    });
  }

  // Returns a new Response object associated with a network error.
  // https://fetch.spec.whatwg.org/#concept-network-error
  static error() {
    const response = new Response(null, {
      status: 0,
      statusText: '',
    });

    response.type = 'error';
    return response;
  }

  // Creates a new response with a different URL.
  static redirect(url, status) {
    if (redirectStatus.indexOf(status) === -1) {
      throw new RangeError('Invalid redirect status code');
    }

    return new Response(null, {
      status,
      headers: {
        location: url,
      },
    });
  }
}

export default Response;
