import { gameState } from '../game-state';
import { Vector } from '../models/math-models/vector';
import { Unit } from '../models/unit';
import { appContextsType, appCanvasesType } from '../../index';
import { Resources } from '../../resources/index';

export class Renderer {
  private contexts: appContextsType;
  private canvases: appCanvasesType;
 constructor(contexts: appContextsType, canvases: appCanvasesType) {
   this.contexts = contexts;
   this.canvases = canvases;
 }
  public render(): void {
    this.renderBackground();
    this.contexts.main.drawImage(this.canvases.background, 0, 0);
    // this.contexts.main.drawImage(this.contexts.fixed, 0, 0);
    this.renderEntity(gameState.getPlayer());
  }

  private renderEntities(list: Array<Unit>): void {
    for (let i = 0; i < list.length; i++) {
      this.renderEntity(list[i]);
    }
  }

  private renderBackground(): void {
    Resources.getImages().backgrounds.background
      .render(this.contexts.background, new Vector(0, 0), new Vector(500, 500));
  }

  private renderEntity(entity: Unit): void {
    this.contexts.main.save();
    this.contexts.main.translate(entity.getPosition().x, entity.getPosition().y);
    this.contexts.main.rotate(entity.getDirection().angleTo(new Vector(1, 0)));
    entity.render(this.contexts.main);
    this.contexts.main.restore();
  }
}
