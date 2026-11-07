import type { EvaluationJobData } from '../../types';
import type { PuppeteerDriverPage } from '../PuppeteerDriverPage';

export type TaskHandler = (page: PuppeteerDriverPage, data: EvaluationJobData) => Promise<void>;