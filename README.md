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
tree -l 2 -o output.txt
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

## 安装

```
npm install -g sys-tree
```
