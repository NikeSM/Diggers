import { IUnit } from '../../models/unit/unit';
import { ITank } from '../../models/unit/tanks/tank';

export class GameState {
  private player: ITank;
  private gameTime: number;
  private staticUnits: Array<IUnit> = [];
  private dynamicUnits: Array<IUnit> = [];

  constructor() {
    //
  }

  public addStaticUnit(unit: IUnit): void {
    this.staticUnits.push(unit);
  }

  public addDynamicUnit(unit: IUnit): void {
    unit && this.dynamicUnits.push(unit);
  }

  public getAllUnits(): Array<IUnit> {
    return [this.player as IUnit].concat(this.staticUnits);
  }

  public deleteUnit(unit: IUnit): void {
    this.dynamicUnits = this.dynamicUnits.filter(savedUnit => unit !== savedUnit);
    this.player = this.player === unit ? null : this.player;
  }

  public getPlayer(): ITank {
    return this.player;
  }

  public setPlayer(player: ITank): void {
    this.player = player;
  }

  public getDynamicUnits(): Array<IUnit> {
    return this.dynamicUnits;
  }

  public getStaticUnits(): Array<IUnit> {
    return this.staticUnits;
  }

  public getGameTime(): number {
    return this.gameTime;
  }

  public setGameTime(time: number): void {
    this.gameTime = time;
  }
}
