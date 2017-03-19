import { tanks, tanksImagesNamespace } from './tanks/index';
import { walls, wallImagesNamespace } from './walls/index';
import { backgrounds, backgroundImagesNamespace } from './backgrounds/index';

export type imageResourceType = {
  tanks: tanksImagesNamespace,
  walls: wallImagesNamespace,
  backgrounds: backgroundImagesNamespace
}

export const images = {
  tanks: tanks,
  walls: walls,
  backgrounds: backgrounds
};
