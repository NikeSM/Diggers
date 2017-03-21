import { Sprite } from '../../../app/models/animation/sprite';

export type tanksImagesNamespace = {
  tank: Sprite;
}

export const tanks: tanksImagesNamespace = {
  tank: new Sprite({
    spritePosition: {x: 0, y: 0},
    size: {x: 100, y: 100},
    isAnimation: false,
    imageName: 'tank.png'
  })
};
