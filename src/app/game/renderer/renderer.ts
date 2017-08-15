import { Vector } from '../../models/math-models/vector';
import { appContextsType, appCanvasesType } from '../map/map';
import { Resources } from '../../../resources/index';
import { IUnit } from '../../models/unit/unit';
import { GameState } from '../game-state/game-state';

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


  private static renderEntities(list: Array<IUnit>, context: CanvasRenderingContext2D): void {
    for (let i = 0; i < list.length; i++) {
      Renderer.renderEntity(list[i], context);
    }
  }

  private renderBackground(): void {
    Resources.getImages().backgrounds.background
      .render(this.contexts.background, new Vector(0, 0), new Vector(500, 500));
  }

  private renderStaticObjects(): void {
    Renderer.renderEntities(this.gameState.getStaticUnits(), this.contexts.fixed);
  }

  private static renderEntity(entity: IUnit, context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(entity.getPosition().x, entity.getPosition().y);
    context.rotate(entity.getDirection().angleTo(new Vector(1, 0)));
    entity.render(context);
    context.restore();
  }
}
