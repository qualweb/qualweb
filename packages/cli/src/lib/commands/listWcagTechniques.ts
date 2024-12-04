import { Command } from 'commander';

import wcagTechniquesJson from '@qualweb/wcag-techniques/lib/techniques.json';

export const ListWcagTechniquesCommand = new Command('list-wcag-techniques')
  .description('Lists all the WCAG techniques known to this program and exits.')
  .action(() => {
    console.info('WCAG techniques:');
    
    for (const rule of Object.values(wcagTechniquesJson)) {
      console.info(`${rule.code} (${rule.mapping}) - ${rule.name}`);
    }

    process.exit(0);
  })
  ;