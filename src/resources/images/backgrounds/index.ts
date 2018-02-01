import { imageDirection, Sprite } from '../../../app/models/animation/sprite';
import { Vector } from '../../../app/models/math-models/vector';
export type backgroundImagesNamespace = {
  background: Sprite;
}
export const backgrounds: backgroundImagesNamespace = {
  background: new Sprite({
    spritePosition: new Vector(0, 0),
    size: new Vector(1001, 1025),
    isAnimation: false,
    imageName: 'background.png',
    direction: imageDirection.RIGHT
  })
};
