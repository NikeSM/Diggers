import { ShapeUnit } from '../../models/unit/shape-unit/shape-unit';

export class GameState {

  private _player: ShapeUnit;
  private _gameTime: number;
  private _staticUnits: Array<ShapeUnit> = [];

  constructor() {
    //
  }

  public addStaticUnit(unit: ShapeUnit): void {
    this._staticUnits.push(unit);
  }

  public getAllUnits(): Array<ShapeUnit> {
    return [this.player].concat(this.staticUnits);
  }

  get staticUnits(): Array<ShapeUnit> {
    return this._staticUnits;
  }

  get gameTime(): number {
    return this._gameTime;
  }

  set gameTime(value: number) {
    this._gameTime = value;
  }
  get player(): ShapeUnit {
    return this._player;
  }

  set player(value: ShapeUnit) {
    this._player = value;
  }
}
