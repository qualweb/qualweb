'use strict';

import { QualwebOptions } from '@qualweb/core';

async function startup(options: QualwebOptions): Promise<void> {
  console.log(options);
}

export = startup;