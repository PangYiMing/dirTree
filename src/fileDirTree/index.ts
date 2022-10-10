/*
 * @Author: pym
 * @Date: 2022-01-10 09:48:34
 * @LastEditors: pym
 * @Description:
 * @LastEditTime: 2022-10-10 20:04:07
 */
import path from 'path';
import { walkSync } from '../utils/readDirPaths';
import transformDocs from '../plugin/index';
import { execAbortArr, strNotIncludeStringInArr } from '../utils/utils';

import { Command } from 'commander';

const program = new Command();
program
    .option('-t, --target <type>', 'specify target path')
    .option('-d, --deep <type>', 'option:specify max deep, etc.: 2 ')
    .option(
        '-i, --ignore <type>',
        'option:specify ignore dirs, etc.: .git,node_modules. default .git,node_modules'
    );

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

let abortArr: string[] = execAbortArr(
    options.ignore ? options.ignore.split(',') : ['.git', 'node_modules']
);

let isFirst = true;
const target = options.target ? path.resolve(options.target) : process.cwd();

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
        console.log(printStr + filePath.split(path.sep).pop());
    }
    isFirst = false;
    if (
        stat.isFile() &&
        ['js', 'ts', 'jsx', 'tsx'].includes(getEndWith(filePath))
    ) {
        const outFilePath = path.resolve(target, 'docs');
        transformDocs(filePath, outFilePath);
    }
}

function getEndWith(str: string): string {
    const endWith = str.indexOf('.') ? str.split('.').at(-1) : '';
    return endWith;
}
walkSync({
    dirPath: target,
    callback,
    maxDeep: options.deep ? parseInt(options.deep, 10) : -1,
});
