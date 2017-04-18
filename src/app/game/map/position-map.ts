import { Unit } from '../../models/unit/unit';
import { Vector } from '../../models/math-models/vector';
import { shapeType, ShapeUnit } from '../../models/unit/shape-unit/shape-unit';

export type positionMapOptionsType = {
  step: number;
}

export class PositionMap {
  private _positionMapHash: { [key: string]: Array<ShapeUnit> } = {};
  private _unitPositionMapHash: { [key: string]: Array<string> } = {};
  private _step: number;

  constructor(options: positionMapOptionsType) {
    this.step = options.step;
  }

  public setUnitPositionMap(unit: ShapeUnit): void {
    this.unitPositionMapHash[unit.id] = this.getPositionMapSockets(unit);
    this.setPositionMapSockets(this.unitPositionMapHash[unit.id], unit);
  }

  public deleteUnitPositionMap(unit: ShapeUnit): void {
    let positionMap = this.unitPositionMapHash[unit.id];
    if (positionMap) {
      positionMap.map(key => {
        this.positionMapHash[key] = this.positionMapHash[key].filter(saveUnit => saveUnit !== unit);
      });
    }
    delete this.unitPositionMapHash[unit.id];
  }

  public changeUnitPositionMap(unit: ShapeUnit): void {
    this.deleteUnitPositionMap(unit);
    this.setUnitPositionMap(unit);
  }

  public getCollisionUnits(unit: ShapeUnit, newPosition: Vector): Array<ShapeUnit> {
    let result: Array<ShapeUnit> = [];
    this.getPositionMapSockets(unit, newPosition).map(key => {
      this.positionMapHash[key].map(saveUnit => {
        if (saveUnit !== unit) {
          result.push(saveUnit);
        }
      });
    });
    return result;
  }

  private getPositionMapSockets(unit: ShapeUnit,
                                position: Vector = unit.position,
                                size: Vector = unit.getRectangleSize()): Array<string> {

    let maxSideHalf = Math.max(size.x, size.y) / 2;
    let s_x = Math.floor((position.x - maxSideHalf) / this.step);
    let s_y = Math.floor((position.y - maxSideHalf) / this.step);
    let e_x = Math.floor((position.x + maxSideHalf) / this.step);
    let e_y = Math.floor((position.y + maxSideHalf) / this.step);
    let result: Array<string> = [];
    for (let i = s_x; i < e_x; i++) {
      for (let j = s_y; j < e_y; j++) {
        let key = i + '' + j;
        result.push(key);
      }
    }
    return result;
  }

  private setPositionMapSockets(sockets: Array<string>, unit: ShapeUnit): void {
    sockets.map(key =>
      this.positionMapHash[key] ? this.positionMapHash[key].push(unit) : this.positionMapHash[key] = [unit]);
  }

  get positionMapHash(): { [p: string]: Array<ShapeUnit> } {
    return this._positionMapHash;
  }

  set positionMapHash(value: { [p: string]: Array<ShapeUnit> }) {
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
