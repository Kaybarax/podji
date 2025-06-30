/**
 * Script to overwrite theme.ts with a React Native stylesheet
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the package directory
const packageDir = path.resolve(__dirname, '..');
const mobileDistDir = path.join(packageDir, 'dist/mobile');

// Read the react-native-styles.ts file
try {
  const reactNativeStylesContent = fs.readFileSync(path.join(mobileDistDir, 'react-native-styles.ts'), 'utf8');

  // Write the content to theme.ts
  fs.writeFileSync(path.join(mobileDistDir, 'theme.ts'), reactNativeStylesContent);
  console.log('Successfully overwrote theme.ts with React Native stylesheet');
} catch (error) {
  console.error('Error overwriting theme.ts:', error);
}
