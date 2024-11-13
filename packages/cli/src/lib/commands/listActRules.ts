import { Command } from 'commander';

import actRulesJson from '@qualweb/act-rules/lib/rules.json';

export const ListActRulesCommand = new Command('list-act-rules')
  .description('Lists all the ACT rules known to this program and exits.')
  .action(() => {
    console.info('ACT rules:');
    
    for (const rule of Object.values(actRulesJson)) {
      console.info(`${rule.code} (${rule.mapping}) - ${rule.name}`);
    }

    process.exit(0);
  })
  ;