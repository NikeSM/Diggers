import { Sprite } from '../../../app/models/animation/sprite';
export type wallImagesNamespace = {
  wall: Sprite;
}
export const walls: wallImagesNamespace = {
  wall: new Sprite({
    spritePosition: {x: 0, y: 0},
    size: {x: 20, y: 20},
    isAnimation: false,
    imageName: 'wall.png'
  })
};
