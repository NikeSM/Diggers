import { imageDirection, Sprite } from '../../../app/models/animation/sprite';
import { Vector } from '../../../app/models/math-models/vector';
export type bulletImagesNamespace = {
  bullet: Sprite;
}
export const bullets: bulletImagesNamespace = {
  bullet: new Sprite(
    {
    spritePosition: new Vector(585, 410),
    size: new Vector(63, 245),
    isAnimation: false,
    imageName: 'bullet.png',
    direction: imageDirection.UP
  })
};
