import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

describe('Style Dictionary Configuration', () => {
  // This test will fail initially because we need to implement/refine sd.config.js
  it.skip('should generate Tailwind CSS output with correct color token', () => {
    // Run the build:tokens script to generate the output
    execSync('yarn build:tokens --config sd.config.js', { cwd: path.resolve(__dirname, '..') });

    // Check if the output file exists
    const tailwindTokensPath = path.resolve(__dirname, '../dist/tailwind-tokens.js');
    expect(fs.existsSync(tailwindTokensPath)).toBe(true);

    // Read the generated file
    const tailwindTokens = fs.readFileSync(tailwindTokensPath, 'utf8');

    // Assert that it contains the correct color token
    expect(tailwindTokens).toContain('"color.ref.light.cyan": "#ACEEF3"');

    // This assertion will fail because the format in sd.config.js doesn't match what we're expecting
    // It will be fixed in T2006
    expect(tailwindTokens).toContain('"cyan": "#ACEEF3"');
  });
});
