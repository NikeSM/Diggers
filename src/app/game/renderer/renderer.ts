import { Vector } from '../../models/math-models/vector';
import { appContextsType, appCanvasesType } from '../map/map';
import { Resources } from '../../../resources/index';
import { Game } from '../game';
import { ShapeUnit } from '../../models/unit/shape-unit/shape-unit';

export class Renderer {
  private contexts: appContextsType;
  private canvases: appCanvasesType;
  private game: Game;

 constructor(contexts: appContextsType, canvases: appCanvasesType, game: Game) {
   this.contexts = contexts;
   this.canvases = canvases;
   this.game = game;
 }
  public preRender(): void {
    this.renderBackground();
    this.renderStaticObjects();
  }

  public render(): void {
    this.contexts.main.drawImage(this.canvases.background, 0, 0);
    this.contexts.main.drawImage(this.canvases.fixed, 0, 0);
    this.renderEntity(this.game.gameState.player, this.contexts.main);
  }


  private renderEntities(list: Array<ShapeUnit>, context: CanvasRenderingContext2D): void {
    for (let i = 0; i < list.length; i++) {
      this.renderEntity(list[i], context);
    }
  }

  private renderBackground(): void {
    Resources.getImages().backgrounds.background
      .render(this.contexts.background, new Vector(0, 0), new Vector(500, 500));
  }

  private renderStaticObjects(): void {
   this.renderEntities(this.game.gameState.staticUnits, this.contexts.fixed);
  }

  private renderEntity(entity: ShapeUnit, context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(entity.position.x, entity.position.y);
    context.rotate(entity.direction.angleTo(new Vector(1, 0)));
    entity.render(context);
    context.restore();
  }
}
