import { QWPage } from "@qualweb/qw-page";
import { AccessibilityUtils } from "@qualweb/util";
import { CounterReport } from "@qualweb/counter";

async function executeCounter(page: QWPage): Promise<CounterReport | void> {
  let roles: any = {}; //dicionario roles
  let names: any = {}; //dicionario tag
  // const CounterReport = new CounterReport();
  const elementList = page.getElements("*");

  //get explicit roles
  for (const element of elementList) {
    const role = AccessibilityUtils.getElementRole(element, page);
    const tag = element.getElementTagName();
    // count elements
    if (role !== null) {
      if (roles[role] === undefined) {
        roles[role] = 0;
      }

      roles[role]++;
    }
    // count tags

    if (tag !== null) {
      if (names[tag] === undefined) {
        names[tag] = 0;
      }
      names[tag]++;
    }
  }

  console.log(roles, names);
}

export { executeCounter };
