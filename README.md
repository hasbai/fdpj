# 自动评教脚本

## 功能

自动填写评教问卷

注意：暂不支持需要输入文字的必填项

## 使用方法

进入评教平台（[ce.fudan.edu.cn](http://ce.fudan.edu.cn)），`F12`打开调试工具，将本仓库`main.js`中的代码复制进控制台回车运行即可。

或者在控制台中输入以下命令：

```js
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'https://cdn.jsdelivr.net/gh/hasbai/fdpj/main.js'
document.head.appendChild(script)
```

## 手动版本（不会自动点击提交）

在控制台中输入以下命令：

```js
let nodes = document.querySelectorAll('#subject_box dl')
for (var i = 0; i < nodes.length; ++i) {
    nodes[i].querySelector('dd a').click()
}
document.querySelector('#next_button').scrollIntoView(true)
```
