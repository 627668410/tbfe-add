# tbfe-add README

## 0.0.1

右键生成需要的index.js及index.cssmodule.styl, 并将index中组件的名字改成文件夹名称

## 0.0.5
添加完弹出打开文件的快速方式

## 0.0.7
+ 添加根据配置文件生成文件内容
- 配置文件目录： 根目录
- 配置文件：tbfe-add.js
- 匹配规则：匹配代码中的  TbfeAddFileName  为新建的文件夹内容

## 0.0.8
+ 提供四个命令用来新增文件，（菜单好像没法动态配置）
  - tbfe-add-page
  - tbfe-add-components
  - tbfe-add-reducers
  - tbfe-add-actions

+ 可以在vscode的设置中配置命令生成文件的模板
```js
"tbfe-add-page": {
    "path": "/src/pages/Home", // 根据src下的pages中的Home文件夹生成文件
    "quickOpen": "/components/index.js" // 生成文件后快速打开/components下的index.js文件
}
```

+ 匹配代码中的  TbfeAddFileName  为新建的文件夹内容

## 0.0.9
暴露五种文件名的格式去替换
```
TbfeAddFileName: (name) => _.upperFirst(_.camelCase(name)),
tbfeAddFileName: (name) => _.camelCase(name),
tbfeaddfilename: (name) => _.toLower(name),
TBFEADDFILENAME: (name) => _.toUpper(name),
'tbfe-add-file-name': (name) => _.kebabCase(name),
tbfe_add_file_name: (name) => _.snakeCase(name),
```