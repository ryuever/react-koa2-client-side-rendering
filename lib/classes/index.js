
class ClassList {
  constructor(el) {
    if (!el || !el.nodeType) {
      throw new Error('elementNodeReference is required.');
    }

    this.el = el;
    this.list = el.classList;
  }

  resolveNames(names, func) {
    if (names.length > 1) {
      names.forEach(name => func(name));
    } else {
      func(names[0]);
    }

    return this;
  }

  // Add specified class values.
  // add(String [,String])
  add(...names) {
    // if (this.contains(name)) return;
    return this.resolveNames(names, name => {
      if (this.list) {
        this.list.add(name);
        return this;
      }

      const arr = this.makeArray();

      if (arr.indexOf(name) === -1) {
        arr.push(name);
      }

      this.el.className = arr.join(' ');
      return this;
    });
  }

  // Remove specified class values.
  // remove(String [,String])
  remove(...names) {
    return this.resolveNames(names, name => {
      if (Object.prototype.toString.call(name) === '[object RegExp]') {
        return this.removeMatches(name);
      }

      if (this.list) {
        this.list.remove(name);
        return this;
      }

      const arr = this.makeArray();
      const i = arr.indexOf(name);

      if (i !== -1) {
        arr.splice(i, 1);
      }

      this.el.className = arr.join(' ');
      return this;
    });
  }

  // Remove specified class values by regular expression
  removeMatches(regExp) {
    const arr = this.makeArray();
    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i];
      if (regExp.test(item)) {
        this.remove(item);
      }
    }
    return this;
  }

  // Return class value by index in collection.
  // @param {Number} i
  // @return
  item(i) {
    const arr = this.makeArray();
    return arr[i];
  }

  // Toggle class value, can force state via `force`.
  // @param {String} name
  // @param {Boolean} force
  // @return {ClassList}
  toggle(name, force) {
    if (this.list) {
      this.list.toggle(name, force);
      return this;
    }

    if (typeof force === 'undefined') {
      if (this.contains(name)) {
        this.remove(name);
      } else {
        this.add(name);
      }
    }

    if (force) {
      if (!this.contains(name)) {
        this.add(name);
      } else {
        this.remove(name);
      }
    }

    return this;
  }

  // Checks if specified class value exists
  // @param {String} name
  // @return {Boolean}
  contains(name) {
    return this.list ? this.list.contains(name) : this.makeArray().indexOf(name) !== -1;
  }

  // alias
  has(name) {
    return this.contains(name);
  }

  makeArray() {
    const cx = this.el.className;
    const str = cx.replace(/^\s+|\s+$/g, '');
    const arr = str.split(/\s+/);
    if (arr[0] === '') {
      arr.shift();
    }
    return arr;
  }
}

export default (el) => new ClassList(el);
