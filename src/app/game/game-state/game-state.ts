import { ShapeUnit } from '../../models/unit/shape-unit/shape-unit';

export class GameState {
  private player: ShapeUnit;
  private gameTime: number;
  private staticUnits: Array<ShapeUnit> = [];

  constructor() {
    //
  }

  public getPlayer(): ShapeUnit {
    return this.player;
  }

  public setPlayer(player: ShapeUnit): void {
    this.player = player;
  }

  public addStaticUnit(unit: ShapeUnit): void {
    this.staticUnits.push(unit);
  }

  public getStaticUnits(): Array<ShapeUnit> {
    return this.staticUnits;
  }

  public getTime(): number {
    return this.gameTime;
  }

  public setTime(time: number): void {
    this.gameTime = time;
  }
}
