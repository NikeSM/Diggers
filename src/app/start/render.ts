import { gameState } from '../game-state';
import { settings } from '../../settings';
import { Vector } from '../models/math-models/vector';
import { Unit } from '../models/unit';
import { appContextsType } from '../../index';

export class Renderer {
  private contexts: appContextsType;
 constructor(contexts: appContextsType) {
   this.contexts = contexts;
 }
  public render(): void {
    this.contexts.drawImage(

      gameState.staticCanvas, 0, 0);
    !gameState.isGameOver && this.renderEntity(gameState.player);
  }

  private renderEntities(list: Array<Unit>): void {
    for (let i = 0; i < list.length; i++) {
      this.renderEntity(list[i]);
    }
  }

  private renderBackground(): void {
    this.contexts.background.drawImage()
  }

  private renderEntity(entity: Unit): void {
    this.context.save();
    this.context.translate(entity.getPosition().x, entity.getPosition().y);
    this.context.rotate(entity.getSpeed().angleTo(new Vector(1, 0)));
    entity.render(this.context);
    this.context.restore();
  }
}
