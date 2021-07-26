import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import { MediaProperties, CSSProperty, MediaProperty } from '@qualweb/qw-element';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisible, ElementHasCSSRules } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R7 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsVisible
  @ElementHasCSSRules
  execute(element: typeof window.qwElement): void {
    const rules = element.getCSSRules();

    let transformValue: number | null = null;
    for (const property in rules || {}) {
      if (rules && rules[property] && property === 'transform') {
        const value = <string>(<CSSProperty>rules[property]).value;
        if (value.startsWith('rotate') || value.startsWith('rotate3d') || value.startsWith('rotateZ')) {
          const angle = value.replace(value.split('(')[0], '').replace('(', '').replace(')', '');
          transformValue = this.parseDegrees(angle);
        }
      }
    }

    const media = <MediaProperties>rules?.media;
    if (media) {
      for (const condition in media || {}) {
        if (condition.includes('orientation:') && (condition.includes('portrait') || condition.includes('landscape'))) {
          for (const property in media[condition] || {}) {
            if (property === 'transform') {
              const cssProperty = <CSSProperty>(<MediaProperty>media[condition])[property];
              const value = cssProperty.value;
              if (value.startsWith('rotate') || value.startsWith('rotate3d') || value.startsWith('rotateZ')) {
                let angle = value.replace(value.split('(')[0], '').replace('(', '').replace(')', '');
                angle = this.parseDegrees(angle.toString()).toString();
                const matrix = this.rotateZ(transformValue ? parseFloat(angle) - transformValue : parseFloat(angle));
                angle = this.calculateRotationDegree(matrix).toString();
                this.checkRotation(element, parseInt(angle));
              } else if (value.startsWith('matrix(') || value.startsWith('matrix3d(')) {
                const matrix = this.fromString(value);
                this.calculateRotationDegree(matrix);
                const angle = this.calculateRotationDegree(matrix);
                this.checkRotation(element, angle);
              }
            }
          }
        }
      }
    }
  }

  private checkRotation(element: typeof window.qwElement, angle: number): void {
    const test = new Test();
    if (angle === 90 || angle === 270) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    }

    test.addElement(element);
    super.addTestResult(test);
  }

  private parseDegrees(angle: string): number {
    angle = angle.toLowerCase();
    if (angle.includes('deg')) {
      return parseFloat(angle.replace('deg', ''));
    } else if (angle.includes('rad')) {
      const radians = parseFloat(angle.replace('rad', ''));
      return (radians * 180) / Math.PI;
    } else if (angle.includes('turn')) {
      const turnDegrees = 360;
      const turns = parseFloat(angle.replace('turn', ''));
      return turns * turnDegrees;
    } else {
      return -1;
    }
  }

  private calculateRotationDegree(matrix: number[]): number {
    const radians = Math.atan2(matrix[1], matrix[0]);
    let degrees = Math.round((radians * 180) / Math.PI);
    if (degrees < 0) {
      degrees = 360 + degrees;
    }
    return Math.abs(degrees); // just ignore the abs
  }

  private identity(): Array<number> {
    const matrix = new Array<number>();
    for (let i = 0; i < 16; i++) {
      i % 5 === 0 ? matrix.push(1) : matrix.push(0);
    }
    return matrix;
  }

  private rotateZ(angle: number): Array<number> {
    const theta = (Math.PI / 180) * angle;
    const matrix = this.identity();

    matrix[0] = matrix[5] = Math.cos(theta);
    matrix[1] = matrix[4] = Math.sin(theta);
    matrix[4] *= -1;

    return matrix;
  }

  private fromString(source: string): Array<number> {
    if (typeof source === 'string') {
      const match = source.match(/matrix(3d)?\(([^)]+)\)/);
      if (match) {
        const raw = match[2].split(',').map(parseFloat);
        return this.format(raw);
      }
      if (source === 'none' || source === '') {
        return this.identity();
      }
    }
    throw new TypeError('Expected a string containing `matrix()` or `matrix3d()');
  }

  private format(source: Array<number>): Array<number> {
    const values = source
      .filter(function (value) {
        return typeof value === 'number';
      })
      .filter(function (value) {
        return !isNaN(value);
      });

    if (source.length === 6 && values.length === 6) {
      const matrix = this.identity();
      matrix[0] = values[0];
      matrix[1] = values[1];
      matrix[4] = values[2];
      matrix[5] = values[3];
      matrix[12] = values[4];
      matrix[13] = values[5];
      return matrix;
    } else if (source.length === 16 && values.length === 16) {
      return source;
    }
    throw new TypeError('Expected a `number[]` with length 6 or 16.');
  }
}

export = QW_ACT_R7;
