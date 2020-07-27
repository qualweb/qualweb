import actRulesJson from './act-rules.options.json';

const header =
` _____ _____ _____ __    _ _ _ _____ _____    _____ __    _____
|     |  |  |  _  |  |  | | | |   __| __  |  |     |  |  |     |
|  |  |  |  |     |  |__| | | |   __| __ -|  |   --|  |__|-   -|
|__  _|_____|__|__|_____|_____|_____|_____|  |_____|_____|_____|
   |__|                                                         `

const strings = {};
const modules = ['act', 'html', 'css', 'bp'];
const reports = ['earl', 'earl-a']
const actRules = [...actRulesJson.qualweb_id, ...actRulesJson.act_id];
const htmlTechniques = ['QW-HTML-T1', 'QW-HTML-T2', 'QW-HTML-T3', 'QW-HTML-T4', 'QW-HTML-T5', 'QW-HTML-T6', 'QW-HTML-T7', 'QW-HTML-T8', 'QW-HTML-T9', 'QW-HTML-T10', 'QW-HTML-T11', 'QW-HTML-T12', 'QW-HTML-T13', 'QW-HTML-T14', 'QW-HTML-T15', 'QW-HTML-T16', 'QW-HTML-T17', 'QW-HTML-T18', 'QW-HTML-T19', 'QW-HTML-T20', 'QW-HTML-T21', 'QW-HTML-T22', 'QW-HTML-T23', 'QW-HTML-T24', 'QW-HTML-T25', 'QW-HTML-T26', 'QW-HTML-T27', 'QW-HTML-T28', 'QW-HTML-T29', 'QW-HTML-T30', 'QW-HTML-T31', 'QW-HTML-T32', 'QW-HTML-T33', 'QW-HTML-T34', 'QW-HTML-T35', 'QW-HTML-T36', 'QW-HTML-T37', 'QW-HTML-T38', 'QW-HTML-T39', 'QW-HTML-T40', 'QW-HTML-T41', 'QW-HTML-T42', 'QW-HTML-T43'];
const cssTechniques = ['QW-CSS-T1', 'QW-CSS-T2', 'QW-CSS-T5', 'QW-CSS-T6', 'QW-CSS-T7'];
const bps = ['QW-BP1', 'QW-BP2', 'QW-BP3', 'QW-BP4', 'QW-BP5', 'QW-BP6', 'QW-BP7', 'QW-BP8', 'QW-BP9', 'QW-BP10', 'QW-BP11', 'QW-BP12', 'QW-BP13', 'QW-BP15', 'QW-BP16'];
const levels = ['A', 'AA', 'AAA'];
const principles = ['Perceivable', 'Operable', 'Understandable', 'Robust']
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
    typeLabel: '{underline file-path} or [ QW-ACT-R1 ... QW-ACT-R'+ actRulesJson.qualweb_id.length + ' ] or [ ACT Rule ID ]',
    type: String,
    multiple: true,
    description: 'Choose which ACT rules to execute.'
  },
  {
    name: 'act-levels',
    typeLabel: '[ ' + levels.join(' | ') + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which conform levels to evaluate. Can be multiple.'
  },
  {
    name: 'act-principles',
    typeLabel: '[ ' + principles.join(' | ') + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which principles to evaluate. Can be multiple.'
  },
  {
    name: 'html-techniques',
    typeLabel: '{underline file-path} or [ QW-HTML-T1 ... QW-HTML-T'+htmlTechniques.length + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which html technique to execute. Can be multiple.'
  },
  {
    name: 'html-levels',
    typeLabel: '[ ' + levels.join(' | ') + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which conform levels to evaluate. Can be multiple.'
  },
  {
    name: 'html-principles',
    typeLabel: '[ ' + principles.join(' | ') + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which principles to evaluate. Can be multiple.'
  },
  {
    name: 'css-techniques',
    typeLabel: '{underline file-path} or [ QW-CSS-T1 ... QW-CSS-T'+cssTechniques.length + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which css technique to execute. Can be multiple.'
  },
  {
    name: 'css-levels',
    typeLabel: '[ ' + levels.join(' | ') + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which conform levels to evaluate. Can be multiple.'
  },
  {
    name: 'css-principles',
    typeLabel: '[ ' + principles.join(' | ') + ' ]',
    type: String,
    multiple: true,
    description: 'Choose which principles to evaluate. Can be multiple.'
  },
  {
    name: 'best-practices',
    typeLabel: '{underline file-path} or [ QW-BP1 ... QW-BP'+bps.length + ' ]',
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
]
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
      '$ qw [-m] html [-html-techniques | -html-levels | -html-principles] ...',
      '$ qw [-m] css [-css-techniques | -css-levels | -css-principles] ...',
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
]

const optionList = [...options, ...viewport, ...moduleFilters];

export {
  optionList,
  sections,
  strings,
  actRules,
  htmlTechniques,
  cssTechniques,
  bps,
  reports,
  levels,
  principles,
  modules
};