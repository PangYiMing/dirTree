#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: pym
 * @Date: 2022-01-10 09:48:34
 * @LastEditors: pym
 * @Description:
 * @LastEditTime: 2022-01-20 15:41:29
 */
const path_1 = __importDefault(require("path"));
const readDirPaths_1 = require("../utils/readDirPaths");
const utils_1 = require("../utils/utils");
const { Command } = require('commander');
const program = new Command();
program
    .option('-t, --target <type>', 'specify target path')
    .option('-d, --deep <type>', 'option:specify max deep, etc.: 2 ')
    .option('-i, --ignore <type>', 'option:specify ignore dirs, etc.: .git,node_modules. default .git,node_modules');
program.parse();
const options = program.opts();
// const { target, deep, ignore } = options;
if (!options.target) {
    options.target = process.cwd();
}
if (!options.deep) {
    options.deep = '-1';
}
if (!options.ignore) {
    options.ignore = '.git,node_modules';
}
console.log(options);
// TODO 如果指定层级在当前行无下一个子元素应该为空格缩进，如果当前行是最后一个子元素应该是回车符号+空格缩进，如果其他，应该是竖线+空格缩进
// const dirPath = path.resolve(__dirname, '../../');
let abortArr = (0, utils_1.execAbortArr)(options.ignore ? options.ignore.split(',') : ['.git', 'node_modules']);
// console.log('abortArr', abortArr)
let isFirst = true;
function callback(filePath, stat, treeOpt) {
    const { deep, isEnd, parent } = treeOpt;
    if (isFirst) {
        console.log(options.target.split(path_1.default.sep).pop());
    }
    if (filePath && (0, utils_1.strNotIncludeStringInArr)(filePath, abortArr)) {
        let printStr = '  ';
        if (!parent.isEndArr) {
            parent.isEndArr = [];
        }
        for (let i = 0; i < parent.isEndArr.length; i++) {
            const isEndEL = parent.isEndArr[i];
            printStr = printStr + (isEndEL ? '     ' : '│    ');
        }
        printStr = printStr + (isEnd ? '└─' : '├─');
        console.log(printStr + filePath.split(path_1.default.sep).pop());
    }
    isFirst = false;
}
(0, readDirPaths_1.walkSync)({
    dirPath: options.target ? path_1.default.resolve(options.target) : process.cwd(),
    callback,
    maxDeep: options.deep ? parseInt(options.deep, 10) : -1,
});
