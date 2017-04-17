import { Unit } from '../../models/unit';

export class GameState {
  private player: Unit;
  private gameTime: number;
  private staticUnits: Array<Unit> = [];

  constructor() {
    //
  }

  public getPlayer(): Unit {
    return this.player;
  }

  public setPlayer(player: Unit): void {
    this.player = player;
  }

  public addStaticUnit(unit: Unit): void {
    this.staticUnits.push(unit);
  }

  public getStaticUnits(): Array<Unit> {
    return this.staticUnits;
  }

  public getTime(): number {
    return this.gameTime;
  }

  public setTime(time: number): void {
    this.gameTime = time;
  }
}
