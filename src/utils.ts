export module utils {
  'use strict';
  export function generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  export function merge<T>(objects: Array<T>): T {
    let result = {};

    objects.map(object => {
      Object.keys(object).map(key => {
        if (object[key] !== null && object[key] !== 'undefined') {
          result[key] = object[key];
        }
      });
    });
    return result as T;
  }
}

