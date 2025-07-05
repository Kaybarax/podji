#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Run visual regression tests for mobile UI components
 */
async function runMobileVisualTests() {
  console.log('🚀 Starting Mobile UI Visual Regression Tests...\n');

  try {
    // Step 1: Start Storybook server
    console.log('📚 Starting Storybook server...');
    const storybookProcess = await startStorybook();

    // Step 2: Wait for Storybook to be ready
    console.log('⏳ Waiting for Storybook to be ready...');
    await waitForStorybook();

    // Step 3: Generate/update scenarios
    console.log('🔄 Generating BackstopJS scenarios...');
    const { updateBackstopConfig } = require('./generate-backstop-scenarios');
    updateBackstopConfig();

    // Step 4: Run BackstopJS tests
    console.log('📸 Running visual regression tests...');
    await runBackstopTest();

    console.log('✅ Visual regression tests completed successfully!');
  } catch (error) {
    console.error('❌ Visual regression tests failed:', error.message);
    process.exit(1);
  } finally {
    // Cleanup: Stop Storybook
    if (global.storybookProcess) {
      console.log('🧹 Stopping Storybook server...');
      global.storybookProcess.kill();
    }
  }
}

/**
 * Start Storybook server in the background
 */
function startStorybook() {
  return new Promise((resolve, reject) => {
    const storybookProcess = spawn('yarn', ['workspace', '@podji/mobile-ui-dev', 'storybook'], {
      cwd: path.join(__dirname, '..'),
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    global.storybookProcess = storybookProcess;

    storybookProcess.stdout.on('data', data => {
      const output = data.toString();
      console.log(`📚 Storybook: ${output.trim()}`);

      // Check if Storybook is ready
      if (output.includes('Local:') && output.includes('6007')) {
        resolve(storybookProcess);
      }
    });

    storybookProcess.stderr.on('data', data => {
      const error = data.toString();
      if (!error.includes('webpack compiled') && !error.includes('Webpack Bundle Analyzer')) {
        console.error(`📚 Storybook Error: ${error.trim()}`);
      }
    });

    storybookProcess.on('error', error => {
      reject(new Error(`Failed to start Storybook: ${error.message}`));
    });

    // Timeout after 60 seconds
    setTimeout(() => {
      reject(new Error('Storybook failed to start within 60 seconds'));
    }, 60000);
  });
}

/**
 * Wait for Storybook server to be ready
 */
function waitForStorybook() {
  return new Promise(resolve => {
    const checkStorybook = async () => {
      try {
        const response = await fetch('http://localhost:6007');
        if (response.ok) {
          console.log('✅ Storybook is ready!');
          // Wait a bit more to ensure everything is loaded
          setTimeout(resolve, 3000);
        } else {
          throw new Error('Storybook not ready');
        }
      } catch (error) {
        console.log('⏳ Waiting for Storybook...');
        setTimeout(checkStorybook, 2000);
      }
    };

    checkStorybook();
  });
}

/**
 * Run BackstopJS test
 */
function runBackstopTest() {
  return new Promise((resolve, reject) => {
    const backstopProcess = spawn('yarn', ['workspace', '@podji/mobile-ui-dev', 'backstop:test'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
    });

    backstopProcess.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`BackstopJS test failed with exit code ${code}`));
      }
    });

    backstopProcess.on('error', error => {
      reject(new Error(`Failed to run BackstopJS: ${error.message}`));
    });
  });
}

// Add fetch polyfill for Node.js < 18
if (!global.fetch) {
  global.fetch = require('node-fetch');
}

// Run if called directly
if (require.main === module) {
  runMobileVisualTests();
}

module.exports = {
  runMobileVisualTests,
};
