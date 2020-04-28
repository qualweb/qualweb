const header =
` _____ _____ _____ __    _ _ _ _____ _____    _____ __    _____
|     |  |  |  _  |  |  | | | |   __| __  |  |     |  |  |     |
|  |  |  |  |     |  |__| | | |   __| __ -|  |   --|  |__|-   -|
|__  _|_____|__|__|_____|_____|_____|_____|  |_____|_____|_____|
   |__|                                                         `

const strings = {};
const modules = ['act', 'html', 'css', 'bp'];
const reports = ['earl', 'earl-a']
const rules = ['r1', 'r2', 'r3', 'r4', 'r5','r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17', 'r18', 'r19', 'r20', 'r21', 'r22', 'r23', 'r24', 'r25', 'r26', 'r27', 'r28', 'r29', 'r30', 'r31', 'r32', 'r33', 'r34', 'r35', 'r36', 'r37', 'r38', 'r39'];
const htmlTechniques = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12', 't13', 't14', 't15', 't16', 't17', 't18', 't19', 't20', 't21', 't22', 't23', 't24', 't25', 't26', 't27', 't28', 't29', 't30', 't31', 't32', 't33', 't34', 't35', 't36', 't37', 't38', 't39', 't40', 't41', 't42', 't43'];
const cssTechniques = ['t1', 't2', 't3', 't4', 't5', 't6', 't7'];
const bps = ['bp1', 'bp2', 'bp3', 'bp4', 'bp5', 'bp6', 'bp7', 'bp8', 'bp9', 'bp10', 'bp11', 'bp12', 'bp13', 'bp14', 'bp15', 'bp16'];
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
    typeLabel: '{underline file-path} or [ QW-ACT-R1 ... QW-ACT-R'+rules.length + ' ]',
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
  rules,
  htmlTechniques,
  cssTechniques,
  bps,
  reports,
  modules
};