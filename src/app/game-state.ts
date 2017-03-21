import { Unit } from './models/unit';

export class GameState {
  private player: Unit;
  private gameTime: number;

  constructor() {
    //
  }

  public getPlayer(): Unit {
    return this.player;
  }

  public setPlayer(player: Unit): void {
    this.player = player;
  }

  public getTime(): number {
    return this.gameTime;
  }

  public setTime(time: number): void {
    this.gameTime = time;
  }
}

export let gameState = new GameState();
