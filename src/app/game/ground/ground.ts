import { Resources } from '../../../resources/index';
import { Vector } from '../../models/math-models/vector';
import { Unit } from '../../models/unit/unit';
export class Ground {
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.init();
  }

  public clearUnitPosition(unit: Unit): void {
    let leftUpX = unit.getPosition().x - unit.getRectangleSize().x / 2;
    let leftUpY = unit.getPosition().y - unit.getRectangleSize().y / 2;
    this.context.clearRect(leftUpX, leftUpY, unit.getRectangleSize().x, unit.getRectangleSize().y);
  }

  public clearUnitsPosition(units: Array<Unit>): void {
    units.map(unit => this.clearUnitPosition(unit));
  }


  private init(): void {
    Resources.getImages().grounds.ground.render(this.context, new Vector(0, 0), new Vector(1000, 1000));
  }

}
