export default class Emitter {
  constructor() {
    this._callbacks = {};
  }

  /**
   * Bind specified event
   *
   * @param {String} event The event name
   * @param {Function} fn The callback
   * @return {Emitter} emitter
   */
  on(event, fn) {
    const _callbacks = this._callbacks;
    _callbacks[event] = _callbacks[event] || [];
    _callbacks[event].push(fn);
    return this;
  }

  /**
   * Bind event and this event will be invoked a single time
   *
   * @param {String} event The event name
   * @param {Function} fn The callback
   * @return {Emitter} emitter
   */
  once(event, fn) {
    const on = (...args) => {
      this.off(event, on);
      fn.apply(this, args);
    };

    on.fn = fn;
    this.on(event, on);
    return this;
  }

  /**
   * Unbind specified event
   *
   * @param {String} event The event name
   * @param {Function} fn The callback
   * @return {Emitter} emitter
   */
  off(event, fn) {
    let _callbacks = this._callbacks;

    // Remove all binding events
    if (typeof event === 'undefined') {
      _callbacks = {};
      return this;
    }

    // Do nothing when the event didn't binding
    const callbacks = _callbacks[event];

    if (!callbacks) {
      return this;
    }

    // Remove specified event
    if (typeof fn === 'undefined') {
      delete _callbacks[event];
      return this;
    }

    // Remove handler
    for (let i = 0, len = callbacks.length; i < len; i++) {
      const cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }

    return this;
  }

  /**
   * Fire specified event
   *
   * @param {String} event The event name
   * @param {Object} options The data should be
   * @return {Emitter} emitter
   */
  emit(event, ...options) {
    const callbacks = this._callbacks[event];
    const len = callbacks.length;

    if (len) {
      for (let i = 0; i < len; i++) {
        callbacks[i].apply(this, options);
      }
    }

    return this;
  }

  /**
   * Handlers for given event
   *
   * @param {String} event The event name
   * @return {Array} return listeners by given event name
   */
  listeners(event) {
    return this._callbacks[event] || [];
  }

  /**
   * Check if the given event has handlers
   *
   * @param {String} event The event name
   * @return {Boolean} checked result
   */
  hasListeners(event) {
    return !!this.listeners(event).length;
  }
}
