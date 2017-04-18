import { Unit } from '../../models/unit/unit';
import { Vector } from '../../models/math-models/vector';

export type positionMapOptionsType = {
  size: Vector,
  step: number
}

export class PositionMap {
  private positionMapHash: {[key: string]: Array<Unit>} = {};
  private UnitPositionMapHash: {[key: string]: Array<string>} = {};
  private step: number;
  private size: Vector;

  constructor(options: positionMapOptionsType) {
    this.setStep(options.step);
    this.setSize(options.size);
  }

  public setUnitPositionMap(): void {

  }

  private getSize(): Vector {
    return this.size;
  }

  private setSize(size: Vector): void {
    this.size = size;
  }

  private getStep(): number {
    return this.step;
  }

  private setStep(step: number): void {
    this.step = step;
  }
}
