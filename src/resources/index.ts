export module resources {
  'use strict';
  let resourceCache = {};
  let readyCallbacks: Array<Function> = [];

  export function load(resouces: Array<string>): void {
      resouces.forEach((url) => _load(url));
  }

  function _checkImg(url: string): void {
    let img: HTMLImageElement = new Image();
    img.onload = () => {
      resourceCache[url] = img;
      isReady() && readyCallbacks.forEach(callback => callback());
      };
    resourceCache[url] = false;
    img.src = url;
  }

  function _load(url: string): any {
    if (resourceCache[url]) {
      return resourceCache[url];
    }
    _checkImg(url);
  }

  export function get(url: string): any {
    return resourceCache[url];
  }

  export function isReady(): boolean {
    return !Object.keys(resourceCache).filter((key) => !resourceCache[key]).length;
  }

  export function onReady(callback: Function): void {
    readyCallbacks.push(callback);
  }
}
