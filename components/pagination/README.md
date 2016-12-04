# Pagination
## Usage
基本调用方式
```
<Pagination total={20} />
```

## Usage API
`Pagination` 组件目前提供下面参数的支持
| Props             | Type     | Description                |
|-------------------|----------|----------------------------|
| prefix            | string   |                            |
| pageSize          | number   | 默认值为10                 |
| current           | number   | 当前处于的页面号           |
| scope             | number   | 控制显示的宽度             |
| total             | number   | 记录数                     |
| showTotalPageText         | bool     | 是否显示数据总数提示       |
| showCurrentPageText       | bool     | 是否显示当前处于的页面提示 |
| simple            | bool     | 是否使用精简模式           |
| totalPageTextRender   | function |                            |
| currentPageTextRender | function |                            |
| onChange          | function | 用来接收当前页面的callback |

## changelog

[./CHANGELOG.md](changelog)
