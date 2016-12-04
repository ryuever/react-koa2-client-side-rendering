/* eslint-disable consistent-return */
// https://fetch.spec.whatwg.org/#body-mixin

const types = {
  string: 'text/plain;charset=UTF-8',
  json: 'application/json',
  urlencoded: 'application/x-www-form-urlencoded;charset=UTF-8',
};

const supportBlob = 'FileReader' in self && 'Blob' in self;
const supportFormData = 'FormData' in self;
const supportArrayBuffer = 'ArrayBuffer' in self;
const supportSearchParams = 'URLSearchParams' in self;

function invokeReaderHandler(reader) {
  return new Promise((resolve, reject) => {
    reader.onloaded = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
  });
}

function readBlobAsArrayBuffer(blob) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  return invokeReaderHandler(reader);
}

function readBlobAsText(blob) {
  const reader = new FileReader();
  reader.readAsText(blob);
  return invokeReaderHandler(reader);
}

function decode(body) {
  const formData = new FormData();

  body.trim().split('&').forEach(bytes => {
    if (bytes) {
      const split = bytes.split('=');
      const name = split.shift().replace(/\+/g, ' ');
      const value = split.join('=').replace(/\+/g, ' ');
      formData.append(decodeURIComponent(name), decodeURIComponent(value));
    }
  });

  return formData;
}

// https://fetch.spec.whatwg.org/#concept-body-consume-body
function consumeBody(thisArg) {
  if (thisArg.bodyUsed) {
    return Promise.reject(new TypeError('Body locked yet'));
  }

  thisArg.bodyUsed = true;
}

export default class Body {
  constructor() {
    this.bodyUsed = false;
  }

  _initBody(body) {
    this._bodyInit = body;

    if (typeof body === 'string') {
      this._bodyText = body;
    } else if (supportBlob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (supportFormData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (supportSearchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (!body) {
      this._bodyText = '';
    } else if (supportArrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
      // ...
    } else {
      throw new Error('Unsupported body type');
    }

    if (!this.headers.get('Content-Type')) {
      if (typeof body === 'string') {
        try {
          JSON.parse(body);
          this.headers.set('Content-Type', types.json);
        } catch (e) {
          this.headers.set('Content-Type', types.string);
        }
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('Content-Type', this._bodyBlob.type);
      } else if (supportSearchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('Content-Type', types.urlencoded);
      }
    }
  }

  blob() {
    const rejected = consumeBody(this);

    if (rejected) {
      return rejected;
    }

    if (supportBlob) {
      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob);
      } else if (this._bodyFormData) {
        throw new Error('could not read formData body as blob');
      } else {
        return Promise.resolve(new Blob([this._bodyText]));
      }
    }
  }

  arrayBuffer() {
    return this.blob().then(readBlobAsArrayBuffer);
  }

  formData() {
    if (supportFormData) {
      return this.text().then(decode);
    }
  }

  json() {
    return this.text().then(JSON.parse);
  }

  text() {
    const rejected = consumeBody(this);

    if (rejected) {
      return rejected;
    }

    if (supportBlob) {
      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyFormData) {
        throw new Error('could not read formData body as text');
      }
    }

    return Promise.resolve(this._bodyText);
  }
}
