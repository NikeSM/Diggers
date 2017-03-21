import { Sprite } from '../../../app/models/animation/sprite';
export type backgroundImagesNamespace = {
  background: Sprite;
}
export const backgrounds: backgroundImagesNamespace = {
  background: new Sprite({
    spritePosition: {x: 0, y: 0},
    size: {x: 500, y: 500},
    isAnimation: false,
    imageName: 'background.png'
  })
};
