import { Sprite } from '../../../app/models/animation/sprite';
export type backgroundImagesNamespace = {
  background: Sprite;
}
export const backgrounds: backgroundImagesNamespace = {
  background: new Sprite({
    spritePosition: {x: 0, y: 0},
    size: {x: 1000, y: 10000},
    isAnimation: false,
    imageName: 'background.png'
  })
};
