// https://fetch.spec.whatwg.org/#dom-headers

const supportIterator = 'Symbol' in self && 'iterator' in Symbol;

function normalizeName(name) {
  let headerName = name;
  if (typeof name !== 'string') {
    headerName = String(name);
  }

  if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name');
  }

  return headerName;
}

function normalizeValue(value) {
  let newValue = value;
  if (typeof value !== 'string') {
    newValue = String(value);
  }

  return newValue;
}

function iteratorFor(items) {
  const iterator = {
    next: () => {
      const value = items.shift();
      return {
        value,
        done: typeof value === 'undefined',
      };
    },
  };

  if (supportIterator) {
    iterator[Symbol.iterator] = () => {
      return iterator;
    };
  }

  return iterator;
}

class Headers {
  constructor(init) {
    this.map = {};

    if (init instanceof Headers) {
      init.forEach(({ name, value }) => this.append(name, value));
    } else if (init) {
      Object.getOwnPropertyNames(init).forEach(name => {
        this.append(name, init[name]);
      });
    }
  }

  // Appends a new value onto an existing header inside a Headers object
  // or adds the header if it does not already exist.
  append(name, value) {
    const normalizedName = normalizeName(name);
    let list = this.map[normalizedName];
    if (!list) {
      list = [];
      this.map[normalizedName] = list;
    }

    list.push(value);
  }

  // Sets a new value for an existing header inside a Headers object,
  // or adds the header if it does not already exist.
  set(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)];
  }

  // Deletes a header from a Headers object.
  delete(name) {
    delete this.map[normalizeName(name)];
  }

  // Returns the first value of a given header from within a Headers object.
  get(name) {
    const values = this.map[normalizeName(name)];
    return values ? values[0] : null;
  }

  // Returns an array of all the values of a header within a Headers object with a given name.
  getAll(name) {
    return this.map[normalizeName(name)] || [];
  }

  // Returns a boolean stating whether a Headers object contains a certain header.
  has(name) {
    return this.map.hasOwnProperty(normalizeName(name));
  }

  forEach(callback, context) {
    Object.getOwnPropertyNames(this.map).forEach(name => {
      this.map[name].forEach(value => {
        callback.call(context, name, value, this);
      });
    });
  }

  // Returns an iterator allowing to go through all keys f the key/value pairs contained in this object.
  keys() {
    const items = [];
    this.forEach((name) => items.push(name));
    return iteratorFor(items);
  }

  // @return Iterator
  values() {
    const items = [];
    this.forEach((name, value) => items.push(value));
    return iteratorFor(items);
  }

  // Returns an iterator allowing to go through all key/value pairs contained in this object.
  entries() {
    const items = [];
    this.forEach((name, value) => items.push([name, value]));
    return iteratorFor(items);
  }
}

// use for...of structure directly on my instead of entries()
if (supportIterator) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

export default Headers;
