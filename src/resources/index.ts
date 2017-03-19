import { imageResourceType } from './images/index';

export class Resources {
  public static images: imageResourceType;
  private  static readyCallbacks: Array<Function> = [];
  private static imageCache: {[key: string]: HTMLImageElement};
  private static imageFolder: string = '/img/';

  public static load(): void {
    let imageArray = ['tank.png', 'wall.png', 'background.png'];
    let imagePromises = imageArray.map(name => {
      return new Promise((resolve, reject) => {
        let img: HTMLImageElement = new Image();
        img.onload = () => {
          this.imageCache[name] = img;
          resolve();
        };
        img.src = this.imageFolder + name;
      });
    });
    Promise.all(imagePromises).then(() =>  this.readyCallbacks.map(callback => callback()));
  }

  public static addOnReadyListener(callback: Function): void {
    this.readyCallbacks.push(callback);
  }

  public static get(imageName: string): HTMLImageElement {
    return this.imageCache[imageName];
  }
}
