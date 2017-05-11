import { Unit } from '../../models/unit/unit';
import { Tank } from '../../models/unit/tanks/tank';

export class GameState {
  private player: Tank;
  private gameTime: number;
  private staticUnits: Array<Unit> = [];
  private dynamicUnits: Array<Unit> = [];

  constructor() {
    //
  }

  public addStaticUnit(unit: Unit): void {
    this.staticUnits.push(unit);
  }


  public addDynamicUnit(unit: Unit): void {
    this.dynamicUnits.push(unit);
  }

  public getAllUnits(): Array<Unit> {
    return [this.player as Unit].concat(this.staticUnits);
  }

  public deleteUnit(unit: Unit): void {
    this.dynamicUnits = this.dynamicUnits.filter(savedUnit => unit !== savedUnit);
    this.player = this.player === unit ? null : this.player;
  }

  public getPlayer(): Tank {
    return this.player;
  }

  public setPlayer(player: Tank): void {
    this.player = player;
  }

  public getDynamicUnits(): Array<Unit> {
    return this.dynamicUnits;
  }

  public getStaticUnits(): Array<Unit> {
    return this.staticUnits;
  }

  public getGameTime(): number {
    return this.gameTime;
  }

  public setGameTime(time: number): void {
    this.gameTime = time;
  }
}
