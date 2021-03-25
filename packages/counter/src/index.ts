import { QWPage } from '@qualweb/qw-page';
import { AccessibilityUtils } from '@qualweb/util';
import { CounterReport } from '@qualweb/counter';

async function executeCounter(page: QWPage): Promise<CounterReport> {
  const cr: CounterReport = { type: 'counter', data: { roles: {}, tags: {} } };
  const elementList = page.getElements('*');

  //get explicit roles
  for (const element of elementList ?? []) {
    const role = AccessibilityUtils.getElementRole(element, page);
    const tag = element.getElementTagName();
    // count elements
    if (role !== null) {
      if (cr.data.roles[role] === undefined) {
        cr.data.roles[role] = 0;
      }

      cr.data.roles[role]++;
    }
    // count tags

    if (tag !== null) {
      if (cr.data.tags[tag] === undefined) {
        cr.data.tags[tag] = 0;
      }
      cr.data.tags[tag]++;
    }
  }

  return cr;
}

export { executeCounter };
