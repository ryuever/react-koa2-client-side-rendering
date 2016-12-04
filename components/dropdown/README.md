# Dropdown
## Usage
调用方式如下，组件Dropdown会接受两个children；其中第一个作为target，然后第二个children
作为source放置到target的左下角位置。
```
<Dropdown style={style}>
  <div><a href="#">功能</a></div>
  <ul className="select-content">
    <li className="option">
      <a href="#">编辑任务，重复作业</a>
    </li>
    <li className="option">
      <a href="#">删除</a>
    </li>
  </ul>
</Dropdown>
```

## Usage API
`Dropdown` 组件目前提供下面参数的支持

| Props  | Type            |
|--------|-----------------|
| prefix | string          |
| style  | object          |
| visible| bool            |
|trigger | array           |
## changelog

[./CHANGELOG.md](changelog)
