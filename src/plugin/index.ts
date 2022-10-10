/*
 * @Author: pym
 * @Date: 2022-10-10 14:59:42
 * @LastEditors: pym
 * @Description: TODO xxx
 * @LastEditTime: 2022-10-10 16:28:19
 */
import { transformFromAstSync } from '@babel/core';
import { parse } from '@babel/parser';
import autoDocumentPlugin from './auto-document-plugin';
import fs from 'fs';
import path from 'path';

export default function transformDocs(tPath, outputDir) {
    const sourceCode = fs.readFileSync(tPath, {
        encoding: 'utf-8',
    });

    const ast = parse(sourceCode, {
        sourceType: 'unambiguous',
        plugins: ['typescript'],
    });

    const { code } = transformFromAstSync(ast, sourceCode, {
        plugins: [
            [
                autoDocumentPlugin,
                {
                    outputDir,
                    fileName: tPath.split(path.sep).at(-1).split('.')[0],
                    format: 'markdown', // html / json
                },
            ],
        ],
    });
}
// test code
// const tPath = path.join(__dirname, '../sourceCode.ts');
// const outputDir = path.resolve(__dirname, './docs');
// transformDocs(tPath, outputDir);
