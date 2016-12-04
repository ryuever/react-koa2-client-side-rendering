import Headers from './Headers';
import Request from './Request';
import Response from './Response';

// const supportBlob = 'FileReader' in self && 'Blob' in self;

function getHeaders(xhr) {
  const headers = new Headers();
  const pairs = xhr.getAllResponseHeaders().trim().split('\n');

  pairs.forEach(header => {
    const split = header.trim().split(':');
    const key = split.shift().trim();
    const value = split.join(':').trim();
    headers.append(key, value);
  });

  return headers;
}

const fetch = (input, init) => {
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    let request;

    if (Request.prototype.isPrototypeOf(input) && !init) {
      request = input;
    } else {
      request = new Request(input, init);
    }

    function responseUrl() {
      if ('responseURL' in xhr) {
        return xhr.responseURL;
      }

      if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
      }

      return null;
    }

    xhr.onload = () => {
      const { status, statusText } = xhr;
      const options = {
        status,
        statusText,
        headers: getHeaders(xhr),
        url: responseUrl(),
      };

      const body = 'response' in xhr ? xhr.response : xhr.responseText;
      resolve(new Response(body, options));
    };

    xhr.onerror = () => {
      reject(new TypeError('Network request failed'));
    };

    // xhr.ontimeout = () => {
    //   reject(new TypeError('Network request timeout'));
    // };

    xhr.open(request.method, request.url, true);

    // https://fetch.spec.whatwg.org/#cors-protocol-and-credentials
    if (request.credientials === 'include') {
      xhr.withCredientials = true;
    }

    // if ('responseType' in xhr && supportBlob) {
    //   xhr.responseType = 'blob';
    // }

    request.headers.forEach((name, value) =>
      xhr.setRequestHeader(name, value)
    );

    xhr.send(typeof request._bodyInit !== 'undefined' ? request._bodyInit : null);
  });
};

export default fetch;
