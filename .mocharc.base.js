/**
 * Base configuration for mocha in all packages. Each package should import this
 * file and modify it as needed, in order to maintain a centralized and
 * maintainable testing configuration.
 */

module.exports = {
  // For pretty output.
  "color": true,
  "ui": "bdd",

  // Default spec for files to test.
  "spec": "test/**/*.spec.ts",

  // Use ts-node to compile .spec.ts files on the fly and run them.
  "require": [
    "ts-node/register",
  ],
  
  // Uncomment to get a JSON file with test results instead of output in console.
  // "reporter": "json",
  // "reporterOptions": [
  //   "output=./results.json",
  // ],
}
