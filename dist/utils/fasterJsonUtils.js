"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStrArrFromArrByKey = exports.getArrFromArrByKey = exports.getArrayFromArrByKeyValue = exports.getItemFromArrByKeyValue = void 0;
/*
 * @Author: your name
 * @Date: 2022-01-02 21:54:22
 * @LastEditTime: 2022-01-02 21:54:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \dirTree\src\utils\fasterJsonUtils.ts
 */
/**
 * 跟数组中item的key和value拿到对应的item
 * @param array 源数据数组
 * @param key 要找的key
 * @param value 要找的value，源数据数组中item的key的value和他相等时候会返回
 * @returns
 */
function getItemFromArrByKeyValue(array, key, value) {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item && item[key].toString() === value.toString()) {
            return item;
        }
    }
    return;
}
exports.getItemFromArrByKeyValue = getItemFromArrByKeyValue;
/**
 *
 * @param array 数组
 * @param key 键 可以是字符串数组，也可以是 string
 * @param val 值 最终值
 * @returns 从数组中找到对应key数组的键值的item,层层递进找到的最终值和val一样.
 */
function getArrayFromArrByKeyValue(array, key, val) {
    const newArr = [];
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item && Array.isArray(key)) {
            let value = item;
            let isGo = true;
            for (let i = 0; i < key.length; i++) {
                const cKey = key[i];
                if (value && value[cKey]) {
                    value = value[cKey];
                }
                else {
                    isGo = false;
                    break;
                }
            }
            if (isGo && value.toString() === val.toString()) {
                newArr.push(item);
            }
        }
        else if (item && item[key].toString() === val.toString()) {
            newArr.push(item);
        }
    }
    return newArr;
}
exports.getArrayFromArrByKeyValue = getArrayFromArrByKeyValue;
function getArrFromArrByKey(array, key) {
    return array.map(it => {
        if (typeof it === 'string') {
            return it;
        }
        return it[key];
    });
}
exports.getArrFromArrByKey = getArrFromArrByKey;
function getStrArrFromArrByKey(array, key) {
    return array.map(it => {
        return it[key].toString();
    });
}
exports.getStrArrFromArrByKey = getStrArrFromArrByKey;
