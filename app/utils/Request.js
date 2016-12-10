import fetch from 'isomorphic-fetch';

class Request {
  static get() {

  }

  static post(url, data) {
    return fetch('url', {
      method: 'POST',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  static delete() {

  }
}

export default Request;