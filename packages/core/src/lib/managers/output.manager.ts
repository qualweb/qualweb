'use strict';

import { QualwebOptions } from '@qualweb/core';

async function generate_report(format: string, options: QualwebOptions): Promise<void> {
  console.log(format);
  console.log(options);
}

export = generate_report;