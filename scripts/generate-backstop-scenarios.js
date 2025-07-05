#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Automatically generates BackstopJS scenarios based on Storybook stories
 */
function generateBackstopScenarios() {
  const storiesPath = path.join(__dirname, '../development/mobile-ui-dev/stories');
  const storyFiles = glob.sync('**/*.stories.{ts,tsx,js,jsx}', { cwd: storiesPath });

  const scenarios = [];

  storyFiles.forEach(storyFile => {
    const componentName = path.basename(storyFile, path.extname(storyFile)).replace('.stories', '');
    const storyContent = fs.readFileSync(path.join(storiesPath, storyFile), 'utf8');

    // Extract story names from the file
    const storyExports = extractStoryExports(storyContent);

    storyExports.forEach(storyName => {
      if (storyName !== 'default') {
        const scenario = {
          label: `${componentName} - ${storyName}`,
          url: `http://localhost:6007/iframe.html?args=&id=components-${componentName.toLowerCase()}--${storyName
            .toLowerCase()
            .replace(/([A-Z])/g, '-$1')
            .replace(/^-/, '')}&viewMode=story`,
          selectors: ['#storybook-root'],
          delay: 1000,
          misMatchThreshold: 0.1,
        };

        // Add longer delay for components that might have animations
        if (['modal', 'toast', 'dropdown'].includes(componentName.toLowerCase())) {
          scenario.delay = 1500;
        }

        scenarios.push(scenario);
      }
    });
  });

  return scenarios;
}

/**
 * Extract story export names from story file content
 */
function extractStoryExports(content) {
  const exports = [];

  // Match export const patterns
  const exportRegex = /export\s+const\s+(\w+)\s*[=:]/g;
  let match;

  while ((match = exportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  // Also match export { ... } patterns
  const exportBraceRegex = /export\s*{\s*([^}]+)\s*}/g;
  while ((match = exportBraceRegex.exec(content)) !== null) {
    const exportList = match[1].split(',').map(e => e.trim());
    exports.push(...exportList);
  }

  return exports;
}

/**
 * Update the backstop config with generated scenarios
 */
function updateBackstopConfig() {
  const configPath = path.join(__dirname, '../backstop.mobile.config.js');
  const scenarios = generateBackstopScenarios();

  // Read current config
  delete require.cache[require.resolve(configPath)];
  const config = require(configPath);

  // Update scenarios
  config.scenarios = scenarios;

  // Write back to file
  const configContent = `module.exports = ${JSON.stringify(config, null, 2)};`;
  fs.writeFileSync(configPath, configContent);

  console.log(`Generated ${scenarios.length} BackstopJS scenarios for mobile UI components`);
  scenarios.forEach(scenario => {
    console.log(`  - ${scenario.label}`);
  });
}

// Run if called directly
if (require.main === module) {
  updateBackstopConfig();
}

module.exports = {
  generateBackstopScenarios,
  updateBackstopConfig,
};
