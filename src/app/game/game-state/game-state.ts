import { Unit } from '../../models/unit/unit';

export class GameState {
  private _player: Unit;
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
    this.dynamicUnit.push(unit);
  }

  public getAllUnits(): Array<Unit> {
    return [this.player].concat(this.staticUnits);
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
  get player(): Unit {
    return this._player;
  }

  set player(value: Unit) {
    this._player = value;
  }

  get dynamicUnit(): Array<Unit> {
    return this._dynamicUnit;
  }
}
