import fetch from 'isomorphic-fetch';

class Request {
  static get(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
  }

  static post(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  static del(url, data) {
    if (data) {
      return fetch(url, {
        method: 'Delete',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
        },      
        body: JSON.stringify(data),
      });
    }
    return fetch(url, {
      method: 'Delete'
    });
  }
}

export default Request;