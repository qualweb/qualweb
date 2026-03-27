import type { CounterReport } from '@qualweb/core/evaluation';

function executeCounter(): CounterReport {
  const report: CounterReport = {
    type: 'counter',
    data: {
      roles: {},
      tags: {}
    }
  };

  const elementList = window.qwPage.getElements('*');

  if (!elementList || elementList.length === 0) {
    return report;
  }

  for (const element of elementList) {
    const tag = element.getElementTagName();

    const ignore = element.elementHasAttribute('qw-ignore');

    if (ignore) {
      continue;
    }

    report.data.tags[tag] = (report.data.tags[tag] || 0) + 1;
    if (!['script', 'meta', 'link', 'style', 'head'].includes(tag)) {
      const role = window.AccessibilityUtils.getElementRole(element);

      if (role) {
        report.data.roles[role] = (report.data.roles[role] || 0) + 1;
      }
    }
  }

  return report;
}

export { executeCounter };
