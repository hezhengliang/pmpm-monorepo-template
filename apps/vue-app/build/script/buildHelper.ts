/*
 * @Date: 2023-06-18 12:33:27
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-06-18 21:46:26
 * @Description: 
 */
/**
 * Generate additional configuration files when used for packaging. The file can be configured with some global variables, so that it can be changed directly externally without repackaging
 */
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR, APP_GLOBAL_CONFIG_NAME } from '../constant';
import fs from 'fs-extra';
import colors from 'picocolors';

import {getRootPath } from '../utils';

import pkg from '../../package.json';
import { readYaml } from '../utils/readYaml';
import { BASE_REPLACE_MAP, DEFAULT_APP_CONFIG} from '../constant/config'
interface CreateConfigParams {
  configName: string;
  config: any;
  configFileName?: string;
}
type ReplaceMapType = null | Record<string, string|number>
function _replaceSearStr(data, valReplaceMap=null as ReplaceMapType){
  const fmtRegCbFunc = val => {
    return valReplaceMap && valReplaceMap[val] ? valReplaceMap[val] : 'http://xxx'
  }
  const replaceStr = (str, cb) => {
    return str.replace(/\#{(.*?)\}/g, function(_, p1){
      return cb ? cb(p1) : p1
    })
  }
  const traverse = data => {
    let res = Object.create(null);
    for(let key in data){
      let tmp = data[key]
      if(typeof tmp === 'object'){
        res[key] = traverse(tmp)
      } else {
        res[key] = replaceStr(tmp, fmtRegCbFunc)
      }
    }
    return res
  }
  return traverse(data)
}
function createConfig(params){
  const { configName, config } = params;
  const windowConf = `window.${configName}`;
  // 禁止外部修改
  return `${windowConf}=${JSON.stringify(config)};
    Object.freeze(${windowConf});
    Object.defineProperty(window, "${configName}", {
      configurable: false,
      writable: false,
    });
  `.replace(/\s/g, '');
}
// function _handlePrivateConfigContent(defConf, replaceStrConf, path, name=''){
//   console.log(path, name, '<<<')
//   try {
//     const doc = readYaml(path)
//     if(!doc) return _replaceSearStr(defConf, null)
//     // 定义的业务配置
//     const tarDoc = doc[name] ?? {}

//     const replaceMap = {}
//     Object.keys(BASE_REPLACE_MAP).forEach( key => {
//       if(tarDoc.hasOwnProperty(key)){
//         replaceMap[key] = tarDoc[key]
//       }
//     })

//     console.log(replaceMap)
//     return _replaceSearStr(defConf, replaceMap)
//   } catch (error) {
//     console.log(error)
//     console.log(colors.red(`[Error] error`))
//   }
// }
// function _getEnvConfig(mode: string, envConfPath='../../env.yaml', envName=''){
//   return _handlePrivateConfigContent(DEFAULT_APP_CONFIG, BASE_REPLACE_MAP, envConfPath, mode)
// }
function _getConfigContent(name, path){
  try {
    const doc = readYaml(path)
    if(!doc) return DEFAULT_APP_CONFIG
    // 定义的业务配置
    return doc[name] ?? DEFAULT_APP_CONFIG
  } catch (error) {
    console.log(error)
    console.log(colors.red(`[Error] error`))
  }
}

 function main({mode='production', envConfPath}) {
  // const config = _getEnvConfig(mode, envConfPath);
  const config = _getConfigContent(mode, envConfPath)
  const paras = { config, configName: APP_GLOBAL_CONFIG_NAME, configFileName: GLOB_CONFIG_FILE_NAME }
  try {
    const configStr = createConfig(paras);
    fs.mkdirp(getRootPath(OUTPUT_DIR));
    fs.writeFileSync(getRootPath(`${OUTPUT_DIR}/${GLOB_CONFIG_FILE_NAME}`), configStr);
    console.log(colors.cyan(`[Success] ✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
  } catch (error) {
    console.log(colors.red('[Error] configuration file failed to package:\n' + error));
  }
}


export function runBuildConfig(inject) {
  main(inject);
}
