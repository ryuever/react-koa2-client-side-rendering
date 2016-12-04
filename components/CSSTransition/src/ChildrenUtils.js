import React from 'react';

export default class ChildrenUtils {

  static getChildMapping(children, options) {
    const { defaultKey } = options;
    const ret = {};

    if (!children) {
      return ret;
    }

    if (!Array.isArray(children)) {
      const key = children.key || defaultKey;
      ret[key] = children;
    } else {
      React.Children.forEach(children, (child) => {
        ret[child.key] = child;
      });
    }

    return ret;
  }

  static mergeChildren(prev, next) {
    let pendingKeys = [];
    const keysPending = {};

    for (const key in prev) {
      if (next.hasOwnProperty(key)) {
        if (pendingKeys.length) {
          keysPending[key] = pendingKeys;
          pendingKeys = [];
        }
      } else {
        pendingKeys.push(key);
      }
    }

    const mergedChildren = {};
    for (const key in next) {
      if (keysPending.hasOwnProperty(key)) {
        keysPending[key].forEach((keyPending) => {
          mergedChildren[keyPending] = prev[keyPending];
        });
      } else {
        mergedChildren[key] = next[key];
      }
    }

    if (pendingKeys.length > 0) {
      pendingKeys.forEach((pendingKey) => {
        mergedChildren[pendingKey] = prev[pendingKey];
      });
    }

    return mergedChildren;
  }

  static willLeave(options) {
    const { currentChildMapping, key, visibleProps } = options;
    return (
      visibleProps
      ? currentChildMapping[key] && !currentChildMapping[key].props[visibleProps]
      : !currentChildMapping || !currentChildMapping[key]
    );
  }

  static willEnter(options) {
    const { currentChildMapping, key, visibleProps } = options;

    return (
      visibleProps
      ? currentChildMapping[key] && currentChildMapping[key].props[visibleProps]
      : currentChildMapping && currentChildMapping[key]
    );
  }
}
