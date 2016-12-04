export const isPresent = (obj) => {
  return typeof obj !== 'undefined' && obj !== null;
};

export const isBlank = (obj) => {
  return typeof obj === 'undefined' || obj === null;
};

export const isBoolean = (obj) => {
  return typeof obj === 'boolean';
};

export const isNumber = (obj) => {
  return typeof obj === 'number';
};

export const isString = (obj) => {
  return typeof obj === 'string';
};

export const isArray = (obj) => {
  return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]';
};

export const isDate = (obj) => {
  return obj instanceof Date && !isNaN(obj.valueOf());
};

export const isFunction = (obj) => {
  return typeof obj === 'function';
};

export const isJsObject = (obj) => {
  return obj !== null && (isFunction(obj) || typeof obj === 'object');
};

export const isPromise = (obj) => {
  return isPresent(obj) && isFunction(obj.then);
};

export const isEmpty = (obj) => {
  if (obj == null) {
    return true;
  }

  if (obj.length === 0) {
    return true;
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
};

export const normalizeBlank = (obj) => {
  return isBlank(obj) ? null : obj;
};

export const normalizeBool = (obj) => {
  return isBlank(obj) ? false : obj;
};

export const stringify = (token) => {
  if (isString(token)) {
    return token;
  }

  if (isBlank(token)) {
    return String(token);
  }

  const ret = token.toString();
  const newLineIndex = ret.indexOf('\n');
  return (newLineIndex === -1) ? ret : ret.substring(0, newLineIndex);
};

export class PromiseWrapper {
  // Excutes promises one by one, e.g.
  // const promise = () => new Promise(...)
  // const promise2 = () => new Promise(...)
  // sequentialize([ promise, promise2 ])
  static sequentialize = promiseFactories => {
    let chain = Promise.resolve();
    promiseFactories.forEach(factory => {
      chain = chain.then(factory);
    });
    return chain;
  }

  // Promise finally util similar to Q.finally
  // e.g. finally(promise.then(...))
  /* eslint-disable consistent-return */
  static finally = (promise, cb) => promise.then(res => {
    const otherPromise = cb();
    if (typeof otherPromise.then === 'function') {
      return otherPromise.then(() => res);
    }
  }, reason => {
    const otherPromise = cb();
    if (typeof otherPromise.then === 'function') {
      return otherPromise.then(() => {
        throw reason;
      });
    }
    throw reason;
  })
}
/* eslint-enable consistent-return */

export class StringWrapper {
  static equals = (s1, s2) => s1 === s2;

  static contains = (s, substr) => s.indexOf(substr) !== -1;

  static compare = (a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }

    return 0;
  }
}

export class DateWrapper {
  static create(
    year,
    month = 1,
    day = 1,
    hour = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0
  ) {
    return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
  }

  static fromISOString(str) {
    return new Date(str);
  }

  static fromMillis(ms) {
    return new Date(ms);
  }

  static toMillis(date) {
    return date.getTime();
  }

  static now() {
    return Date.now() || new Date();
  }

  static toJson(date) {
    return date.toJSON();
  }
}
