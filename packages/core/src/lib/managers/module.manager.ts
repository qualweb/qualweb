'use strict';

import { QualwebOptions } from '@qualweb/core';

async function execute_modules(options: QualwebOptions): Promise<void> {
  console.log(options);
}

export = execute_modules;