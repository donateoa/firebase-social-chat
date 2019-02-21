import {environment} from './environments/environment';

// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific
// webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run
// webpack to update the application

export const VERSION = environment.VERSION;
export const PAGE_SIZE = 10;
