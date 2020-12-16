import actRulesJson from './act-rules.options.json';

const header = ` _____ _____ _____ __    _ _ _ _____ _____    _____ __    _____
|     |  |  |  _  |  |  | | | |   __| __  |  |     |  |  |     |
|  |  |  |  |     |  |__| | | |   __| __ -|  |   --|  |__|-   -|
|__  _|_____|__|__|_____|_____|_____|_____|  |_____|_____|_____|
   |__|                                                         `;

const strings = {};
const modules = ['act', 'html', 'css', 'bp', 'wappalyzer'];
const reports = ['earl', 'earl-a'];
const actRules = [...actRulesJson.qualweb_id, ...actRulesJson.act_id];
const wcagTechniques = [
  'QW-WCAG-T1',
  'QW-WCAG-T2',
  'QW-WCAG-T3',
  'QW-WCAG-T4',
  'QW-WCAG-T5',
  'QW-WCAG-T6',
  'QW-WCAG-T7',
  'QW-WCAG-T8',
  'QW-WCAG-T9',
  'QW-WCAG-T10',
  'QW-WCAG-T11',
  'QW-WCAG-T12',
  'QW-WCAG-T13',
  'QW-WCAG-T14',
  'QW-WCAG-T15',
  'QW-WCAG-T16',
  'QW-WCAG-T17',
  'QW-WCAG-T18',
  'QW-WCAG-T19',
  'QW-WCAG-T20',
  'QW-WCAG-T21',
  'QW-WCAG-T22',
  'QW-WCAG-T23',
  'QW-WCAG-T24',
  'QW-WCAG-T25',
  'QW-WCAG-T26',
  'QW-WCAG-T27',
  'QW-WCAG-T28',
  'QW-WCAG-T29',
  'QW-WCAG-T30',
  'QW-WCAG-T31',
  'QW-WCAG-T32'
];
const bps = [
  'QW-BP1',
  'QW-BP2',
  'QW-BP4',
  'QW-BP5',
  'QW-BP6',
  'QW-BP7',
  'QW-BP8',
  'QW-BP9',
  'QW-BP10',
  'QW-BP11',
  'QW-BP12',
  'QW-BP13',
  'QW-BP15',
  'QW-BP17',
  'QW-BP18'
];
const levels = ['A', 'AA', 'AAA'];
const principles = ['Perceivable', 'Operable', 'Understandable', 'Robust'];
const viewport = [
  {
    name: 'viewport',
    alias: 'v',
    description: 'Use custom viewport.',
    type: Boolean
  },
  {
    name: 'mobile',
    description: 'Use mobile mode.',
    type: Boolean
  },
  {
    name: 'orientation',
    description: 'Orientation of the screen.',
    typeLabel: '{underline portrait or landscape}',
    type: String
  },
  {
    name: 'user-agent',
    description: 'User agent for the execution.',
    typeLabel: '{underline user agent string}',
    type: Boolean
  },
  {
    name: 'width',
    description: 'Width of the viewport.',
    type: Number
  },
  {
    name: 'height',
    description: 'Height of the viewport.',
    type: Number
  }
];
const moduleFilters = [
  {
    name: 'act-rules',
    typeLabel:
      '{underline file-path} or [ QW-ACT-R1 ... QW-ACT-R' + actRulesJson.qualweb_id.length + ' ] or [ ACT Rule ID ]',
    type: String,
    multiple: true,
    description: 'Choose which ACT rules to execute.'
  },
  {
    name: 'act-levels',
    typeLabel: '[ ' + levels.join(' | ') + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which conform levels to evaluate for the act rules only. Can be multiple.'
  },
  {
    name: 'act-principles',
    typeLabel: '[ ' + principles.join(' | ') + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which principles to evaluate for the act rules only. Can be multiple.'
  },
  {
    name: 'wcag-techniques',
    typeLabel: '{underline file-path} or [ QW-WCAG-T1 ... QW-WCAG-T' + wcagTechniques.length + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which wcag techniques to execute. Can be multiple.'
  },
  {
    name: 'wcag-levels',
    typeLabel: '[ ' + levels.join(' | ') + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which conform levels to evaluate for the wcag techniques only. Can be multiple.'
  },
  {
    name: 'wcag-principles',
    typeLabel: '[ ' + principles.join(' | ') + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which principles to evaluate for the wcag techniques only. Can be multiple.'
  },
  {
    name: 'best-practices',
    typeLabel: '{underline file-path} or [ QW-BP1 ... QW-BP' + bps.length + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which best-practices to execute. Can be multiple.'
  }
];
const options = [
  {
    name: 'url',
    alias: 'u',
    type: String,
    typeLabel: '{underline url}',
    description: 'Url to evaluate.'
  },
  {
    name: 'file',
    alias: 'f',
    type: String,
    typeLabel: '{underline path-to-file}',
    description: 'File with urls to evaluate.'
  },
  {
    name: 'crawl',
    alias: 'c',
    type: String,
    typeLabel: '{underline domain}',
    description: 'Domain to crawl.'
  },
  {
    name: 'module',
    alias: 'm',
    type: String,
    multiple: true,
    typeLabel: '[ ' + modules.join(' | ') + ' ]',
    description: 'Choose which modules to execute. Can be multiple'
  },
  {
    name: 'report-type',
    alias: 'r',
    type: String,
    typeLabel: '[ ' + reports.join(' | ') + ' ]',
    description: 'Convert the evaluation to `earl` or `earl-a` (earl-aggregated).'
  },
  {
    name: 'save-name',
    alias: 's',
    type: String,
    typeLabel: '{underline name}',
    description: 'The name to save the aggregated earl reports (earl-a).'
  },
  {
    name: 'maxParallelEvaluations',
    alias: 'p',
    type: Number,
    typeLabel: '{underline number}',
    description: 'Evaluates multiples urls at the same time.'
  },
  {
    name: 'json',
    alias: 'j',
    type: String,
    typeLabel: '{underline path-to-json}',
    description: 'Loads a json file with the configs to execute.'
  },
  {
    name: 'help',
    alias: 'h',
    description: 'Print this usage guide.',
    type: Boolean
  }
];
const sections = [
  {
    content: header,
    raw: true
  },
  {
    header: 'QualWeb CLI',
    content: 'QualWeb command line interface.'
  },
  {
    header: 'Usage',
    content: [
      '$ qw [OPTION] ...',
      '$ qw [OPTION] ... [-r] ...',
      '$ qw [-m] act [-act-rules | -act-levels | -act-principles] ...',
      '$ qw [-m] wcag [-wcag-techniques | -wcag-levels | -wcag-principles] ...',
      '$ qw [-m] bp [-best-practices] ...'
    ]
  },
  {
    header: 'Options',
    optionList: options
  },
  {
    header: 'Viewport Options',
    optionList: viewport
  },
  {
    header: 'Module Filters',
    optionList: moduleFilters
  }
];

const optionList = [...options, ...viewport, ...moduleFilters];

export { optionList, sections, strings, actRules, wcagTechniques, bps, reports, levels, principles, modules };
