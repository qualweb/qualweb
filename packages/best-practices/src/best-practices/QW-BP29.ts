import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, IsHTMLDocument, ElementHasNonEmptyAttribute, IsLangSubTagValid, isInMainContext } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP29 extends BestPracticeObject {
    constructor(bestPractice: BestPractice, locale: Translate) {
        super(bestPractice, locale);
    }

    @ElementExists
    @IsHTMLDocument
    @ElementHasNonEmptyAttribute('lang')
    @ElementHasNonEmptyAttribute('xml:lang')
    @IsLangSubTagValid('lang')
    @IsLangSubTagValid('xml:lang')
    @isInMainContext
    execute(element: typeof window.qwElement): void {
        const lang = <string>element.getElementAttribute('lang');
        const xmlLang = <string>element.getElementAttribute('xml:lang');

        const primaryLang = lang.split('-')[0];
        const primaryXmlLang = xmlLang.split('-')[0];

        const test = new Test();

        if (primaryLang.toLowerCase() === primaryXmlLang.toLowerCase()) {
            test.verdict = 'passed';
            test.resultCode = 'P1';
        } else {
            test.verdict = 'failed';
            test.resultCode = 'F1';
        }
        test.addElement(element);
        super.addTestResult(test);
    }
}

export = QW_BP29;
