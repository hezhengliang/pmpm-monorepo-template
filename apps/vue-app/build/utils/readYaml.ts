/*
 * @Date: 2023-06-18 12:42:15
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-06-18 16:02:33
 * @Description: 
 */

import jsYaml from 'js-yaml'
import fs from 'fs-extra';

export function readYaml(path){
  if(!fs.pathExistsSync(path)){
    throw Error(`[Error] ${path} not exists`)
  }
  let doc
  try {
   doc = jsYaml.load(fs.readFileSync(path, 'utf8'));
  } catch (e) {
    console.log(e);
  }
  return doc
}

