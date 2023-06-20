/*
 * @Date: 2023-06-18 12:53:07
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-06-18 15:10:22
 * @Description: 
 */
import type { Plugin } from 'vite'
import { runBuild } from '../../script/build'
export const buildPostPlugin = (opt): Plugin => {
  return {
    name: 'vite-build-post-plugin',
    apply: 'build',
    enforce: 'post',
    closeBundle: () => {
      runBuild(opt)
    }
  }
}