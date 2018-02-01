import { imageDirection, Sprite } from '../../../app/models/animation/sprite';
import { Vector } from '../../../app/models/math-models/vector';
export type groundImagesNamespace = {
  ground: Sprite;
}
export const grounds: groundImagesNamespace = {
  ground: new Sprite({
    spritePosition: new Vector(0, 0),
    size: new Vector(1230, 1230),
    isAnimation: false,
    imageName: 'ground.png',
    direction: imageDirection.RIGHT
  })
};
