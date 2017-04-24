import { Unit } from '../../models/unit/unit';
import { Tank } from '../../models/unit/tanks/tank';

export class GameState {
  private _player: Tank;
  private _gameTime: number;
  private _staticUnits: Array<Unit> = [];
  private _dynamicUnit: Array<Unit> = [];

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

  get staticUnits(): Array<Unit> {
    return this._staticUnits;
  }

  get gameTime(): number {
    return this._gameTime;
  }

  set gameTime(value: number) {
    this._gameTime = value;
  }
  get player(): Tank {
    return this._player;
  }

  set player(value: Tank) {
    this._player = value;
  }

  get dynamicUnits(): Array<Unit> {
    return this._dynamicUnit;
  }
}
