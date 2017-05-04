import { tanks, tanksImagesNamespace } from './tanks/index';
import { walls, wallImagesNamespace } from './walls/index';
import { backgrounds, backgroundImagesNamespace } from './backgrounds/index';
import { bulletImagesNamespace, bullets } from './bullets/index';

export type imageResourceType = {
  tanks: tanksImagesNamespace;
  walls: wallImagesNamespace;
  backgrounds: backgroundImagesNamespace;
  bullets: bulletImagesNamespace;
}

export const images: imageResourceType = {
  tanks: tanks,
  walls: walls,
  backgrounds: backgrounds,
  bullets: bullets
};
