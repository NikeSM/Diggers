import { Unit } from '../../models/unit/unit';
import { Vector } from '../../models/math-models/vector';

export type positionMapOptionsType = {
  step: number;
}

export class PositionMap {
  get step(): number {
    return this._step;
  }

  set step(value: number) {
    this._step = value;
  }
  private positionMapHash: {[key: string]: Array<Unit>} = {};
  private UnitPositionMapHash: {[key: string]: Array<string>} = {};
  private _step: number;

  constructor(options: positionMapOptionsType) {
    this.step = options.step;
  }

  public setUnitPositionMap(): void {

  }

}
