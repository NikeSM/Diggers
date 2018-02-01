import {imageDirection, Sprite} from '../../../app/models/animation/sprite';
import { Vector } from '../../../app/models/math-models/vector';

export type tanksImagesNamespace = {
  tank: Sprite;
}

export const tanks: tanksImagesNamespace = {
  tank: new Sprite({
    spritePosition: new Vector(0, 0),
    size: new Vector(1230, 1230),
    isAnimation: false,
    imageName: 'tank_blue.png',
    direction: imageDirection.UP
  })
};
