import fs from 'fs';
import path from 'path';

interface walkSyncProps {
    dirPath: string;
    callback: Function;
    maxDeep?: number;
}
interface readFileSystemProps {
    dirPath: string;
    callback: Function;
    maxDeep?: number;
    deep: number;
    parent?: any;
}

/**
 *
 * @param walkSyncProps
 *  dirPath 指定tree的根目录
 *  callback 遇到文件或者文件夹的回调
 *  maxDeep 最大回调次数，默认-1（无限层级请设为-1）  ——可选
 * @returns
 */
export function walkSync({ dirPath, callback, maxDeep }: walkSyncProps) {
    readFileSystem({
        dirPath,
        callback,
        maxDeep,
        deep: 1,
    });
}
/**
 *
 * @param readFileSystemProps
 *  dirPath 指定tree的根目录
 *  callback 遇到文件或者文件夹的回调
 *  maxDeep 最大回调次数，默认-1（无限层级请设为-1）  ——可选
 *  deep 当前深度  ——可选
 * @returns
 */
function readFileSystem({
    dirPath,
    callback,
    maxDeep,
    deep = 1,
    parent = {},
}: readFileSystemProps) {
    if (typeof dirPath !== 'string') {
        return;
    } else if (!fs.existsSync(dirPath)) {
        console.error('readFileSystem fs error, file no exist', {
            dirPath,
            callback,
            maxDeep,
            deep,
        });
        return;
    }
    if (typeof maxDeep !== 'number') {
        maxDeep = -1;
    } else if (maxDeep === 0) {
        console.error('readFileSystem maxDeep error, maxDeep invail', {
            dirPath,
            callback,
            maxDeep,
            deep,
        });
        return;
    }

    if (typeof deep !== 'number') {
        deep = 1;
    } else if (deep <= 0) {
        console.error('readFileSystem deep error, deep invail', {
            dirPath,
            callback,
            maxDeep,
            deep,
        });
        return;
    }

    if (typeof callback !== 'function') {
        callback = function () {};
    }

    const fileArr = fs.readdirSync(dirPath);

    fileArr.forEach(function (name, index) {
        var filePath = path.join(dirPath, name);
        var stat = fs.statSync(filePath);
        const isEnd = fileArr.length - 1 === index;
        if (stat.isFile()) {
            callback(filePath, stat, {
                deep,
                isEnd,
                parent,
            });
        } else if (stat.isDirectory()) {
            callback(filePath, stat, {
                deep,
                isEnd,
                parent,
            });
            if (maxDeep < 0 || maxDeep > deep) {
                if (!parent.isEndArr) {
                    parent.isEndArr = [];
                }
                readFileSystem({
                    dirPath: filePath,
                    callback,
                    maxDeep,
                    deep: deep + 1,
                    parent: {
                        ...parent,
                        isEnd,
                        isEndArr: [...parent.isEndArr, isEnd],
                    },
                });
            }
        }
    });
}
