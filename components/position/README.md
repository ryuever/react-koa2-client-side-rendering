# eva-position
当前组件最多只能接受两个React Element，当只包含一个element的时候，相对位置是针对当前的viewport；
如果包含两个elements的话，那么第一个child就作为target来处理。目前支持的相对位置参数position包含下面13种.
Position组件会给target添加一个style props来设置绝对位置。

```
'left, top', 'left, center', 'left, bottom',
'top, left', 'top, center', 'top, right',
'right, top', 'right, center', 'right, bottom',
'bottom, left', 'bottom, center', 'bottom, right',
'center, center',
```

## Usage

```
<Position position="bottom, left">
  <input />
  <div />
</Position>
```

## Usage API

| Props    | Type   | Description                                             |
|----------|--------|---------------------------------------------------------|
| prefix   | string |                                                         |
| position | string | 默认是'bottom, left',目前只支持13种赋值情况             |
| inner    | bool   | 控制source是相对于target的外层还是内部放置，默认是false |
| updatePosition| bool | 外部来控制是否刷新位置                              |
