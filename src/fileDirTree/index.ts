/*
 * @Author: pym
 * @Date: 2022-01-10 09:48:34
 * @LastEditors: pym
 * @Description:
 * @LastEditTime: 2022-02-09 20:51:27
 */
import fs from 'fs';
import path from 'path';
import { walkSync } from '../utils/readDirPaths';
import { stringMul, stringMulLastEnd } from '../utils/strUtils';
import { execAbortArr, strNotIncludeStringInArr } from '../utils/utils';

const { Command } = require('commander');
const program = new Command();
program
    .option('-t, --target <type>', 'specify target path')
    .option('-d, --deep <type>', 'option:specify max deep, etc.: 2 ')
    .option(
        '-i, --ignore <type>',
        'option:specify ignore dirs, etc.: .git,node_modules. default .git,node_modules'
    )
    .option('-r, --replace <type>', 'option: add or del startWith');

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
if (!options.replace) {
    // TODO 替换部分 or 新增
    options.replace = '// @ts-nocheck\n';
}
console.log(options);

// TODO 如果指定层级在当前行无下一个子元素应该为空格缩进，如果当前行是最后一个子元素应该是回车符号+空格缩进，如果其他，应该是竖线+空格缩进
// const dirPath = path.resolve(__dirname, '../../');

let abortArr: string[] = execAbortArr(
    options.ignore ? options.ignore.split(',') : ['.git', 'node_modules']
);

// console.log('abortArr', abortArr)

let isFirst = true;

function callback(
    filePath: string,
    stat: any,
    treeOpt: { deep: number; isEnd: boolean; parent: any }
) {
    const { deep, isEnd, parent } = treeOpt;
    if (isFirst) {
        console.log(options.target.split(path.sep).pop());
    }
    if (filePath && strNotIncludeStringInArr(filePath, abortArr)) {
        let printStr = '  ';
        if (!parent.isEndArr) {
            parent.isEndArr = [];
        }
        for (let i = 0; i < parent.isEndArr.length; i++) {
            const isEndEL = parent.isEndArr[i];
            printStr = printStr + (isEndEL ? '     ' : '│    ');
        }

        printStr = printStr + (isEnd ? '└─' : '├─');
        // TODO 读取文件，写入文件
        if (
            fs.statSync(filePath).isFile() &&
            (filePath.endsWith('.ts') || filePath.endsWith('.tsx'))
        ) {
            console.log('filePath', filePath);
            const fileData = fs.readFileSync(filePath);
            const newData = '// @ts-nocheck\n' + fileData;
            // const newData = fileData.toString().replace('// @ts-nocheck\n', '');
            fs.writeFileSync(filePath, newData);
            console.log(printStr + filePath.split(path.sep).pop());
        }
    }
    isFirst = false;
}

walkSync({
    dirPath: options.target ? path.resolve(options.target) : process.cwd(),
    callback,
    maxDeep: options.deep ? parseInt(options.deep, 10) : -1,
});
