export module resources {
let resourceCache = {};
  let readyCallbacks: Array<Function> = [];

  // Load an image url or an array of image urls
  export function load(resouces: Array<string>) {
      resouces.forEach((url) => _load(url));
  }

  function _checkImg(url: string): void {
    let img: HTMLImageElement = new Image();
    img.onload = () => {
      resourceCache[url] = img;
      (isReady()) && readyCallbacks.forEach((cb) => cb())
      };
    resourceCache[url] = false;
    img.src = url;
  }

  function _load(url: string) {
    if (resourceCache[url]) {
      return resourceCache[url]
    }
    _checkImg(url);
  }

  export function get(url: string) {
    return resourceCache[url];
  }

  export function isReady(): boolean {
    return !Object.keys(resourceCache).filter((key) => !resourceCache[key]).length;
  }

  export function onReady(callback: Function): void {
    readyCallbacks.push(callback);
  }
}