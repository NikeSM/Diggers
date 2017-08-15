import { Vector } from '../../models/math-models/vector';
import { IUnit } from '../../models/unit/unit';

export type positionMapOptionsType = {
  step: number;
}

export class PositionMap {
  private positionMapHash: { [key: string]: Array<IUnit> } = {};
  private unitPositionMapHash: { [key: string]: Array<string> } = {};
  private step: number;

  constructor(options: positionMapOptionsType) {
    this.step = options.step;
  }

  public setUnitPositionMap(unit: IUnit): void {
    this.unitPositionMapHash[unit.getId()] = this.getPositionMapSockets(unit);
    this.setPositionMapSockets(this.unitPositionMapHash[unit.getId()], unit);
  }

  public deleteUnitPositionMap(unit: IUnit): void {
    let positionMap = this.unitPositionMapHash[unit.getId()];
    if (positionMap) {
      positionMap.map(key => {
        this.positionMapHash[key] = this.positionMapHash[key].filter(saveUnit => saveUnit !== unit);
      });
    }
    delete this.unitPositionMapHash[unit.getId()];
  }

  public changeUnitPositionMap(unit: IUnit): void {
    this.deleteUnitPositionMap(unit);
    this.setUnitPositionMap(unit);
  }

  public getCollisionUnits(unit: IUnit, newPosition: Vector): Array<IUnit> {
    let result: Array<IUnit> = [];
    this.getPositionMapSockets(unit, newPosition).map(key => {
      this.positionMapHash[key] && this.positionMapHash[key].map(saveUnit => {
        if (saveUnit !== unit) {
          result.push(saveUnit);
        }
      });
    });
    return result;
  }

  private getPositionMapSockets(unit: IUnit,
                                position: Vector = unit.getPosition(),
                                size: Vector = unit.getRectangleSize()): Array<string> {
    let maxSideHalf = Math.max(size.x, size.y) / 2;
    let s_x = Math.floor((position.x - maxSideHalf) / this.step);
    let s_y = Math.floor((position.y - maxSideHalf) / this.step);
    let e_x = Math.floor((position.x + maxSideHalf) / this.step);
    let e_y = Math.floor((position.y + maxSideHalf) / this.step);
    let result: Array<string> = [];
    for (let i = s_x; i <= e_x; i++) {
      for (let j = s_y; j <= e_y; j++) {
        let key = i + '_' + j;
        result.push(key);
      }
    }
    return result;
  }

  private setPositionMapSockets(sockets: Array<string>, unit: IUnit): void {
    sockets.map(key =>
      this.positionMapHash[key] ? this.positionMapHash[key].push(unit) : this.positionMapHash[key] = [unit]);
  }
}
