#!/usr/bin/env node

const fs = require('fs');

const configPath = '/Users/kevin/workspace/podji/backstop.mobile.config.js';
let content = fs.readFileSync(configPath, 'utf8');

// Replace all instances of "#storybook-root" selectors with "body"
content = content.replace(/"#storybook-root"/g, '"body"');

// Also increase delays to 3000ms for better stability
content = content.replace(/"delay": 1000/g, '"delay": 3000');
content = content.replace(/"delay": 1500/g, '"delay": 3000');

fs.writeFileSync(configPath, content);
console.log('Updated backstop.mobile.config.js with better selectors and delays');
