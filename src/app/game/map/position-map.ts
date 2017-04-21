import { Vector } from '../../models/math-models/vector';
import { Unit } from '../../models/unit/unit';

export type positionMapOptionsType = {
  step: number;
}

export class PositionMap {
  private _positionMapHash: { [key: string]: Array<Unit> } = {};
  private _unitPositionMapHash: { [key: string]: Array<string> } = {};
  private _step: number;

  constructor(options: positionMapOptionsType) {
    this.step = options.step;
  }

  public setUnitPositionMap(unit: Unit): void {
    this.unitPositionMapHash[unit.id] = this.getPositionMapSockets(unit);
    this.setPositionMapSockets(this.unitPositionMapHash[unit.id], unit);
  }

  public deleteUnitPositionMap(unit: Unit): void {
    let positionMap = this.unitPositionMapHash[unit.id];
    if (positionMap) {
      positionMap.map(key => {
        this.positionMapHash[key] = this.positionMapHash[key].filter(saveUnit => saveUnit !== unit);
      });
    }
    delete this.unitPositionMapHash[unit.id];
  }

  public changeUnitPositionMap(unit: Unit): void {
    this.deleteUnitPositionMap(unit);
    this.setUnitPositionMap(unit);
  }

  public getCollisionUnits(unit: Unit, newPosition: Vector): Array<Unit> {
    let result: Array<Unit> = [];
    this.getPositionMapSockets(unit, newPosition).map(key => {
      this.positionMapHash[key] && this.positionMapHash[key].map(saveUnit => {
        if (saveUnit !== unit) {
          result.push(saveUnit);
        }
      });
    });
    return result;
  }

  private getPositionMapSockets(unit: Unit,
                                position: Vector = unit.position,
                                size: Vector = unit.getRectangleSize()): Array<string> {
    unit.position.equals(new Vector(5, 5)) && console.log(unit);
    let maxSideHalf = Math.max(size.x, size.y) / 2;
    let s_x = Math.floor((position.x - maxSideHalf) / this.step);
    let s_y = Math.floor((position.y - maxSideHalf) / this.step);
    let e_x = Math.floor((position.x + maxSideHalf) / this.step);
    let e_y = Math.floor((position.y + maxSideHalf) / this.step);
    let result: Array<string> = [];
    for (let i = s_x; i <= e_x; i++) {
      for (let j = s_y; j <= e_y; j++) {
        s_x === 0 && console.log(s_x);
        let key = i + '_' + j;
        result.push(key);
      }
    }
    return result;
  }

  private setPositionMapSockets(sockets: Array<string>, unit: Unit): void {
    sockets.map(key =>
      this.positionMapHash[key] ? this.positionMapHash[key].push(unit) : this.positionMapHash[key] = [unit]);
  }

  get positionMapHash(): { [p: string]: Array<Unit> } {
    return this._positionMapHash;
  }

  set positionMapHash(value: { [p: string]: Array<Unit> }) {
    this._positionMapHash = value;
  }

  get unitPositionMapHash(): { [p: string]: Array<string> } {
    return this._unitPositionMapHash;
  }

  set unitPositionMapHash(value: { [p: string]: Array<string> }) {
    this._unitPositionMapHash = value;
  }

  private get step(): number {
    return this._step;
  }

  private set step(value: number) {
    this._step = value;
  }
}
