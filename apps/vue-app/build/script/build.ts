/*
 * @Date: 2023-06-18 12:33:27
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-06-18 16:01:30
 * @Description: 
 */
// #!/usr/bin/env node

import { runBuildConfig } from './buildHelper';
import colors from 'picocolors';

import pkg from '../../package.json';

export const runBuild = async (argv) => {
  try {
    runBuildConfig(argv);
    console.log(`✨ ${colors.cyan(`[${pkg.name}]`)}` + ' - build successfully!');
  } catch (error) {
    console.log(colors.red('vite build error:\n' + error));
    process.exit(1);
  }
};

