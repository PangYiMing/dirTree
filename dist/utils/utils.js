"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strNotIncludeStringInArr = exports.execAbortArr = void 0;
const path_1 = __importDefault(require("path"));
function execAbortArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = path_1.default.sep + arr[i];
    }
    return arr;
}
exports.execAbortArr = execAbortArr;
function strNotIncludeStringInArr(str, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (str.indexOf(arr[i]) !== -1) {
            return false;
        }
    }
    return true;
}
exports.strNotIncludeStringInArr = strNotIncludeStringInArr;
