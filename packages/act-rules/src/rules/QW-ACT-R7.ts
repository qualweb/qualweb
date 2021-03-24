import { ACTRuleResult } from '@qualweb/act-rules';
import { ConditionProperty, CSSProperty, MediaProperty, QWElement } from '@qualweb/qw-element';
import * as Rematrix from 'rematrix';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisible } from '../lib/decorator';

@ACTRuleDecorator
class QW_ACT_R7 extends Rule {
  private rawMap: any = {};
  private mediaMap: any = {};

  constructor(rule?: any) {
    super(rule);
  }

  public unmappedExecute(styleSheets: any[]): void {
    if (styleSheets.length === 0) {
      this.fillEvaluation('inapplicable', 'A page where there are no CSS styles.', 'RC1');
    } else {
      this.rawMap = {};
      this.mediaMap = {};
      let foundATransform = false;

      for (const styleSheet of styleSheets || []) {
        if (styleSheet.content && styleSheet.content.plain && styleSheet.content.plain.includes('transform')) {
          this.analyseAST(styleSheet.content.parsed, styleSheet.file);
          foundATransform = true;
        }
      }
      if (foundATransform) {
        const keys = Object.keys(this.mediaMap);
        for (const key of keys || []) {
          let angle = this.mediaMap[key].replace('rotate(', '').replace(')', '');
          angle = this.parseDegrees(angle);
          const matrix = Rematrix.rotateZ(angle);
          angle = this.calculateRotationDegree(matrix);
          this.checkRotation(angle);
        }
      } else {
        this.fillEvaluation('inapplicable', 'A page that has no CSS transform property specified.', 'RC2');
      }
    }
  }

  private analyseAST(cssObject: any, parentType?: string): void {
    if (
      cssObject === undefined ||
      cssObject['type'] === 'comment' ||
      cssObject['type'] === 'keyframes' ||
      cssObject['type'] === 'import'
    ) {
      // ignore
      return;
    }

    if (cssObject['type'] === 'rule' || cssObject['type'] === 'font-face' || cssObject['type'] === 'page') {
      if (this.isVisible(cssObject)) {
        this.extractInfo(cssObject, parentType);
      } else {
        this.fillEvaluation(
          'inapplicable',
          'A page where CSS transform property is applied to an element that is not visible.',
          'RC3'
        );
      }
    } else {
      if (cssObject['type'] === 'stylesheet') {
        for (const key of cssObject['stylesheet']['rules'] || []) {
          this.analyseAST(key, parentType);
        }
      } else {
        for (const key of cssObject['rules'] || []) {
          if (cssObject['type'] && cssObject['type'] === 'media') {
            this.analyseAST(key, cssObject[cssObject['type']]);
          } else {
            this.analyseAST(key);
          }
        }
      }
    }
  }

  private extractInfo(cssObject: any, parentType?: string): void {
    if (cssObject.selectors === undefined) return;

    let declarations = cssObject['declarations'];

    if (declarations) {
      for (const declaration of declarations || []) {
        if (declaration['property'] && declaration['value'] && declaration['property'].includes('transform')) {
          if (
            parentType &&
            parentType.includes('orientation') &&
            (parentType.includes('landscape') || parentType.includes('portrait'))
          ) {
            if (declaration['value'].includes('rotateZ')) {
              let angle = declaration['value'].replace('rotateZ(', '').replace(')', '');
              angle = this.parseDegrees(angle);
              let matrix = Rematrix.rotateZ(angle);
              angle = this.calculateRotationDegree(matrix);
              this.checkRotation(angle);
            } else if (declaration['value'].includes('matrix')) {
              let matrix = Rematrix.fromString(declaration['value']);
              this.calculateRotationDegree(matrix);
              let angle = this.calculateRotationDegree(matrix);
              this.checkRotation(angle);
            } else if (declaration['value'].includes('rotate')) {
              if (
                this.rawMap.hasOwnProperty(cssObject.selectors.toString()) &&
                this.rawMap[cssObject.selectors.toString()] === declaration['value']
              ) {
                this.fillEvaluation(
                  'passed',
                  'A page where CSS transform property has rotate transform function conditionally applied on the orientation media feature which matches the default CSS transform applied on the target element.',
                  'RC4'
                );
                delete this.rawMap[cssObject.selectors.toString()];
              } else {
                this.mediaMap[cssObject.selectors.toString()] = declaration['value'];
              }
            }
          } else {
            if (
              this.mediaMap.hasOwnProperty(cssObject.selectors.toString()) &&
              this.mediaMap[cssObject.selectors.toString()] === declaration['value']
            ) {
              this.fillEvaluation(
                'passed',
                'A page where CSS transform property has rotate transform function conditionally applied on the orientation media feature which matches the default CSS transform applied on the target element.',
                'RC5'
              );
              delete this.mediaMap[cssObject.selectors.toString()];
            } else {
              this.rawMap[cssObject.selectors.toString()] = declaration['value'];
            }
          }
        }
      }
    }
  }

  private checkRotation(angle: number): void {
    if (angle === 90 || angle === 270) {
      this.fillEvaluation(
        'failed',
        'A page where CSS transform property has rotate transform function conditionally applied on the orientation media feature which restricts the element to landscape orientation.',
        'RC7'
      );
    } else {
      this.fillEvaluation(
        'passed',
        'A page where CSS transform property has rotateZ transform function conditionally applied on the orientation media feature which does not restrict the element to either portrait or landscape orientation.',
        'RC5'
      );
    }
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

  private fillEvaluation(verdict: '' | 'passed' | 'failed' | 'inapplicable', description: string, resultCode: string) {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    evaluation.verdict = verdict;
    evaluation.description = description;
    evaluation.resultCode = resultCode;

    super.addEvaluationResult(evaluation);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: QWElement): void {
    const rules = element.getCSSRules();

    if (!rules) {
      return;
    }

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

    const media = <MediaProperty>rules.media;
    if (media) {
      for (const condition in media || {}) {
        if (condition.includes('orientation:') && (condition.includes('portrait') || condition.includes('landscape'))) {
          for (const property in media[condition] || {}) {
            if (property === 'transform') {
              const cssProperty = <CSSProperty>(<ConditionProperty>media[condition])[property];
              const value = cssProperty.value;
              if (value.startsWith('rotate') || value.startsWith('rotate3d') || value.startsWith('rotateZ')) {
                let angle = value.replace(value.split('(')[0], '').replace('(', '').replace(')', '');
                angle = this.parseDegrees(angle.toString()).toString();
                const matrix = Rematrix.rotateZ(
                  transformValue ? parseFloat(angle) - transformValue : parseFloat(angle)
                );
                angle = this.calculateRotationDegree(matrix).toString();
                this.checkRotation(parseInt(angle));
              } else if (value.startsWith('matrix(') || value.startsWith('matrix3d(')) {
                const matrix = Rematrix.fromString(value);
                this.calculateRotationDegree(matrix);
                const angle = this.calculateRotationDegree(matrix);
                this.checkRotation(angle);
              }
            }
          }
        }
      }
    }
  }

  private isVisible(cssObject: any): boolean {
    const declarations = cssObject['declarations'];
    if (declarations) {
      for (const declaration of declarations) {
        if (declaration['property'] && declaration['value']) {
          if (declaration['property'] === 'display') {
            return !(declaration['value'] === 'none');
          } else if (declaration['property'] === 'visibility') {
            return !(declaration['value'] === 'hidden') || !(declaration['value'] === 'collapse');
          }
        }
      }
    }
    return true;
  }
}

export = QW_ACT_R7;
