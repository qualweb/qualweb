'use strict';

import { QualwebOptions } from '@qualweb/core';

async function validate_options(options: QualwebOptions): Promise<void> {
  console.log(options);
}

export {
  validate_options
};