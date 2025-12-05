import type { QWElement } from '@qualweb/qw-element';
import { Check } from '../lib/Check.object';
import { ElementExists } from '@qualweb/util/applicability';
import { QWBrowserTest } from '../lib/decorator';

class QW_CUI_C9 extends Check {

    
         @ElementExists
         @QWBrowserTest
         // @ts-ignore
         async execute(element?: QWElement): Promise<void> {
          
       }
}


export { QW_CUI_C9 };
