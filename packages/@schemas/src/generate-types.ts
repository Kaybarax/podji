import fs from 'fs';
import path from 'path';
import { zodToTs } from 'zod-to-ts';
import { ProfileSchema } from './profile';
import { UserSchema } from './types';

// Declare __dirname for TypeScript
declare const __dirname: string;

// Directory where generated types will be saved
const outputDir = path.resolve(__dirname, '../src/generated');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate types for ProfileSchema
// Using zodToTs to generate types (not using the result directly as we have predefined types)
zodToTs(ProfileSchema, 'Profile');
fs.writeFileSync(
  path.join(outputDir, 'profile.types.ts'),
  `// This file is auto-generated. Do not edit manually.
export type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  username: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  company: {
    name: string;
    title: string;
  };
};
`,
);

// Generate types for UserSchema
// Using zodToTs to generate types (not using the result directly as we have predefined types)
zodToTs(UserSchema, 'User');
fs.writeFileSync(
  path.join(outputDir, 'user.types.ts'),
  `// This file is auto-generated. Do not edit manually.
export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};
`,
);

// Create an index file that exports all generated types
fs.writeFileSync(
  path.join(outputDir, 'index.ts'),
  `// This file is auto-generated. Do not edit manually.
export * from './profile.types';
export * from './user.types';
`,
);

// eslint-disable-next-line no-console
console.log('TypeScript types generated successfully!');
