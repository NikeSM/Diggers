import { imageResourceType, images } from './images/index';

export class Resources {
  private static images: imageResourceType;
  private static readyCallbacks: Array<Function> = [];
  private static imageCache: {[key: string]: HTMLImageElement} = {};
  private static imageFolder: string = './images/';

  public static load(): void {
    let imageArray = ['tank.png', 'wall.png', 'background.png', 'bullet.png', 'ground.png'];
    let imagePromises = imageArray.map(name => {
      return new Promise((resolve, reject) => {
        let img: HTMLImageElement = new Image();
        img.onload = () => {
          Resources.imageCache[name] = img;
          resolve();
        };
        img.onerror = reject;
        img.src = Resources.imageFolder + name;
      });
    });
    Promise.all(imagePromises).then(() =>  this.readyCallbacks.map(callback => callback()));
    Resources.images = images;
  }

  public static addOnReadyListener(callback: Function): void {
    Resources.readyCallbacks.push(callback);
  }

  public static get(imageName: string): HTMLImageElement {
    return Resources.imageCache[imageName];
  }

  public static getImages(): imageResourceType {
    return Resources.images;
  }
}
