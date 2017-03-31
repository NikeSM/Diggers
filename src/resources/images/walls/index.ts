import { Sprite } from '../../../app/models/animation/sprite';
import { Vector } from '../../../app/models/math-models/vector';
export type wallImagesNamespace = {
  wall: Sprite;
}
export const walls: wallImagesNamespace = {
  wall: new Sprite({
    spritePosition: new Vector(0, 0),
    size: new Vector(100, 100),
    isAnimation: false,
    imageName: 'wall.png'
  })
};
