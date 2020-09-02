/* eslint-disable @typescript-eslint/no-var-requires */

(function () {
  const fs = require('fs');
  let doc;

  try {
    doc = JSON.parse(fs.readFileSync('.env.json', 'utf8'));
  } catch (e) {
    return;
  }

  if (typeof doc === 'object') {
    Object.keys(doc).forEach(function (key) {
      process.env[key] = typeof doc[key] === 'object' ? JSON.stringify(doc[key]) : doc[key];
    });
  }
})();
