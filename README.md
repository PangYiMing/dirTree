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

配置 conf.js

```JavaScript
module.exports = {
    "name": "dirTree",       // 根目录名
    "path": "./",            // 根目录路径
    "ignoreList": [/^\./],   // 忽略列表，当正则匹配成功时忽略该文件／目录
    "type": "console"        // 打印方式，console表示打印到控制台
}
```

运行 tree.js

```
node tree.js
```

程序将会 dfs 遍历目录得到一个树状的 json 对象：

```
{
  name: 'dirTree',
  type: 'dir',
  childD: [{
    name: 'lib',
    type: 'dir',
    childD: [],
    childF: [{name: 'dirTree.js', type: 'file'}]
  }],
  childF: [{name: 'conf.js', type: 'file'},
    {name: 'tree.js', type: 'file'}]
}
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
