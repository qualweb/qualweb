const tests = [
  {
    code: `<!DOCTYPE html>
           <html lang="EN" xml:lang="en"></html>`,
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
           <html lang="fr" xml:lang="en"></html>`,
    outcome: 'failed'
  }
];
module.exports = { tests };
