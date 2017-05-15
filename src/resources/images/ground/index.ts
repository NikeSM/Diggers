import { Sprite } from '../../../app/models/animation/sprite';
import { Vector } from '../../../app/models/math-models/vector';
export type groundImagesNamespace = {
  ground: Sprite;
}
export const grounds: groundImagesNamespace = {
  ground: new Sprite({
    spritePosition: new Vector(0, 0),
    size: new Vector(1000, 1030),
    isAnimation: false,
    imageName: 'ground.png'
  })
};
