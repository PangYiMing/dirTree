<!--
 * @Author: pym
 * @Date: 2022-01-07 19:32:20
 * @LastEditors: pym
 * @Description:
 * @LastEditTime: 2022-01-20 15:21:26
-->

# dirTree

以树状图列出目录内容的 nodejs 实现，类似于 linux 下的 tree 命令

## 结构

```
dirTree
  ├─dist
  │    ├─fileDirTree
  │    │    └─index.js
  │    └─utils
  │         ├─readDirPaths.js
  │         ├─strUtils.js
  │         └─utils.js
  ├─LICENSE
  ├─package-lock.json
  ├─package.json
  ├─README.md
  ├─src
  │    ├─fileDirTree
  │    │    └─index.ts
  │    └─utils
  │         ├─readDirPaths.ts
  │         ├─strUtils.ts
  │         └─utils.ts
  └─tsconfig.json

```

## 例子

cmd:

```
stree
```

打印树状图到控制台：

```
dirTree
  │
  ├─lib
  │  │
  │  └dirTree.js
  │
  ├─README.md
  │
  ├─conf.js
  │
  └─tree.js
```

支持的参数

```
// stree -t 路径 -d 层级 -i 忽略列表
// 默认值 -t ./（当前目录）
// 默认值 -d -1 （无限层级）
// 默认值 -i .git,node_modules
stree -t /Users/xxx/workspace  -d 2 -i .git,node_modules

```

## 安装

```
npm install -g sys-tree
```
