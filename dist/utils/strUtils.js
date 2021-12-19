"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringMulLastEnd = exports.stringMul = void 0;
function objFormatStr(params, lIndex = 1) {
    let string = `${lIndex === 1 ? '\n' : ''}{`;
    const tabStr = '  ';
    const array = Object.keys(params);
    for (let i = 0; i < array.length; i++) {
        const key = array[i];
        if (typeof params[key] === 'object') {
            string += `\n${stringMul(tabStr, lIndex)}${key}: ${objFormatStr(params[key], lIndex + 1)}`;
        }
        else {
            string += `\n${stringMul(tabStr, lIndex)}${key}: ${params[key]}`;
        }
    }
    string += `\n${stringMul(tabStr, lIndex - 1)}}`;
    return string;
}
function stringMul(params, len) {
    if (len <= 0) {
        return '';
    }
    let str = '';
    for (let i = 0; i < len; i++) {
        str += params;
    }
    return str;
}
exports.stringMul = stringMul;
function stringMulLastEnd(params, len, targetStr) {
    return stringMul(params, len) + targetStr;
}
exports.stringMulLastEnd = stringMulLastEnd;
