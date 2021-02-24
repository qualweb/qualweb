import { QWPage } from "@qualweb/qw-page";
import { AccessibilityUtils } from "@qualweb/util";
import { CounterReport } from "@qualweb/counter";

async function executeCounter(page: QWPage): Promise<CounterReport | void> {
  let roles2: any = {}; //dicionario roles
  let names: any = {}; //dicionario tag
  const cr: CounterReport = {type: 'counter', data:{roles:{},tags:{}}};
  const elementList = page.getElements("*");

  //get explicit roles
  for (const element of elementList) {
    const role = AccessibilityUtils.getElementRole(element, page);
    const tag = element.getElementTagName();
    // count elements
    if (role !== null) {
      if (roles2[role] === undefined) {
        roles2[role] = 0;
      }

      roles2[role]++;
    }
    // count tags

    if (tag !== null) {
      if (names[tag] === undefined) {
        names[tag] = 0;
      }
      names[tag]++;
    }
  }
  cr.data.roles = roles2;
  cr.data.tags = names;
  return cr;
  
}

export { executeCounter };
    

  