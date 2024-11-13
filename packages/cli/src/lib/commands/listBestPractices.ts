import { Command } from 'commander';

import bestPracticesJson from '@qualweb/best-practices/lib/bestPractices.json';

export const ListBestPracticesCommand = new Command('list-best-practices')
  .description('Lists all the best practices known to this program and exits.')
  .action(() => {
    console.info('Best Practices:');
    
    for (const rule of Object.values(bestPracticesJson)) {
      if ('mapping' in rule)
        console.info(`${rule.code} (${rule.mapping}) - ${rule.name}`);
      else
        console.info(`${rule.code} - ${rule.name}`);
    }

    process.exit(0);
  })
  ;