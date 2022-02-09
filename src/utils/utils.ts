/*
 * @Author: pym
 * @Date: 2022-01-10 09:48:34
 * @LastEditors: pym
 * @Description:
 * @LastEditTime: 2022-02-09 20:49:46
 */
import path from 'path';

export function execAbortArr(arr: string[]): string[] {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = path.sep + arr[i];
    }
    return arr;
}

export function strNotIncludeStringInArr(str: string, arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
        if (str.indexOf(arr[i]) !== -1) {
            return false;
        }
    }
    // TODO 不支持带'.'路径
    const paths = str.split(path.sep);
    for (let index = 0; index < paths.length; index++) {
        const p = paths[index];
        if (p.indexOf('.') === 0) {
            return false;
        }
    }

    return true;
}
