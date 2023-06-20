/*
 * @Date: 2023-06-18 12:36:09
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-06-18 15:00:46
 * @Description: 
 */
import path from 'path'

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}
// 完整路径
export const filePathAll = (filePath) => path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath)