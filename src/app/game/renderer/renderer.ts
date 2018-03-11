import { Vector } from '../../models/math-models/vector';
import { appContextsType, appCanvasesType } from '../map/map';
import { Resources } from '../../../resources';
import { IUnit } from '../../models/unit/unit';
import { GameState } from '../game-state/game-state';
import { Sprite } from '../../models/animation/sprite';

export type renderObjectArgs = {
  context: CanvasRenderingContext2D,
  sprite: Sprite,
  position: Vector,
  direction: number,
  drawPoint: Vector,
  size: Vector
}

export class Renderer {
  private contexts: appContextsType;
  private canvases: appCanvasesType;
  private gameState: GameState;

  constructor(contexts: appContextsType, canvases: appCanvasesType, gameState: GameState) {
    this.contexts = contexts;
    this.canvases = canvases;
    this.gameState = gameState;
  }

  public preRender(): void {
    this.renderBackground();
    this.renderStaticObjects();
  }

  public render(): void {
    this.contexts.main.drawImage(this.canvases.background, 0, 0);
    this.contexts.main.drawImage(this.canvases.ground, 0, 0);
    this.contexts.main.drawImage(this.canvases.fixed, 0, 0);
    Renderer.renderEntities(
      [this.gameState.getPlayer() as IUnit].concat(this.gameState.getDynamicUnits()),
      this.contexts.main
    );
  }


  private static renderEntities(entities: Array<IUnit>, context: CanvasRenderingContext2D): void {
    for (let i = 0; i < entities.length; i++) {
      Renderer.renderEntity(entities[i], context);
    }
  }

  private renderStaticObjects(): void {
    Renderer.renderEntities(this.gameState.getStaticUnits(), this.contexts.fixed);
  }

  private static renderEntity(entity: IUnit, context: CanvasRenderingContext2D): void {
    Renderer.renderObject({
      context: context,
      position: entity.getPosition(),
      direction: entity.getDirection().angleTo(new Vector(1, 0)),
      sprite: entity.getSprite(),
      drawPoint: entity.getDrawPoint(),
      size: entity.getRectangleSize()
    });
  }

  private static renderObject(args: renderObjectArgs): void {
    args.context.save();
    args.context.translate(args.position.x, args.position.y);
    args.context.rotate(args.sprite.getAngle());
    args.context.rotate(args.direction);
    args.sprite.render(args.context, args.drawPoint, args.size);
    args.context.restore();
  }

  private renderBackground(): void {
    Renderer.renderObject({
      context: this.contexts.background,
      position: new Vector(0, 0),
      direction: 0,
      sprite: Resources.getImages().backgrounds.background,
      drawPoint: new Vector(0, 0),
      size: new Vector(500, 500)
    });
  }
}
