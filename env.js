const path = require('path');
const z = require('zod');
const packageJSON = require('./package.json');

const APP_ENV = process.env.APP_ENV ?? 'development';

const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

const BUNDLE_ID = 'com.neoObjects'; // ios bundle id
const PACKAGE = 'com.neoObjects'; // android package name
const NAME = 'neo-objects'; // app name
const EXPO_ACCOUNT_OWNER = 'hubert.wojcik'; // expo account owner

/**
 * function withEnvSuffix that will add a suffix to the variable name based on the APP_ENV
 * Add a suffix to variable env based on APP_ENV
 * @param {string} name
 * @returns  {string}
 */

const withEnvSuffix = (name) => {
  return `${name}.${APP_ENV}`;
};

// 3. Environment variable schemas
// Client-side variables schemas
const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),
  NASA_API_KEY: z.string(),
  API_URL: z.string(),
});

// Build time variables schemas
const buildTime = z.object({
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string(),
});

/**
 * @type {Record<keyof z.infer<typeof client> , string | undefined>}
 */
const _clientEnv = {
  APP_ENV,
  NAME: NAME,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,
  API_URL: process.env.API_URL,
  NASA_API_KEY: process.env.NASA_API_KEY,
};

/**
 * @type {Record<keyof z.infer<typeof buildTime> , string | undefined>}
 */
const _buildTimeEnv = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID: process.env.EAS_PROJECT_ID,
};

// 4. Merge and validate environment variables
const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
};

const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,
    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
  );
  throw new Error(
    'Invalid environment variables, Check terminal for more details ',
  );
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = {
  Env,
  ClientEnv,
  withEnvSuffix,
};
