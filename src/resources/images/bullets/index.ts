import { Sprite } from '../../../app/models/animation/sprite';
import { Vector } from '../../../app/models/math-models/vector';
export type bulletImagesNamespace = {
  bullet: Sprite;
}
export const bullets: bulletImagesNamespace = {
  bullet: new Sprite({
    spritePosition: new Vector(0, 0),
    size: new Vector(100, 100),
    isAnimation: false,
    imageName: 'bullet.png'
  })
};
