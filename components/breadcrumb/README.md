# Breadcrumb

## Usage

### Basic Usage
```
<Breadcrumb>
  <Breadcrumb.Link href='#'>
    首页
  </Breadcrumb.Link>
  <Breadcrumb.Link href='#'>
    简介
  </Breadcrumb.Link>
</Breadcrumb>

<Breadcrumb>
  <Breadcrumb.Link href='#'>
    <Icon name="football" />
      首页
    <Icon name="basketball" />
  </Breadcrumb.Link>
</Breadcrumb>
```

### Integrated with react-router
在render的时候引入 `react-router`
```
render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route name='Product' path='product' component={Products}>
        <Route name='Bag' path=':id' component={Bag}>
          <Route name='Band' path=':id' component={Band}/>
        </Route>
      </Route>
      <Route name='Orders' path='orders' component={Orders}>
        <Route name='Price' path='price' component={Price} />
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))
```
在component中通过下面的方式引入Breadcrumb模块
```
<Breadcrumb
  routes={this.props.routes}
  params={this.props.params}/>
```
最后会按照下面的顺序进行显示设置
1. 如果说 `<Route name='xxx' >` 中提供了name参数的话，就会通过name的值来进行标示。比如当
  访问 `product/1234` 的时候，显示的是 `Product/Bag`
2. 假如说没有提供 `name` props的话，就会显示 `path` props对应的值；其中会将 `:id` 这种
  placeholder提供成实际的值；比如当访问 `product/1234`的时候显示的就是 `product / 1234`

## Usage API

### Common props
#### Breadcrumb
| Props     | Type                       | Description                            |
|-----------|----------------------------|----------------------------------------|
| seperator | React component or string  | 用来分割breadcrumb之间的对象，默认是 / |
| prefix    | string                     |                                         |
#### Breadcrumb.Link

| Props | Type   |
|-------|--------|
| href  | string |

### react-router oriented
#### Breadcrumb
| Props  | Type   |
|--------|--------|
| routes | object |
| params | object |
