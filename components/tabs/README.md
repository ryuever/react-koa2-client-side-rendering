# Tabs

## Usage
### Basic Usage
```
<Tabs>
  <TabItem>
    <TabTitle active>
      <Icon name="basketball" />
      篮球
    </TabTitle>
    <TabPanel>
      <div className="basketball">
        hello world
      </div>
    </TabPanel>
  </TabItem>
<Tabs>
```

## Usage API
### Tabs Component
| Props     | Type   | Description                          |
|-----------|--------|--------------------------------------|
| prefix    | string |                                      |
| hoverable | bool   | 支持hover触发tab                     |
| hoverTime | number | 设置hover触发tab的生效时间，单位毫秒 |


### TabList
| Props    | Type   | Description                                                                          |
|----------|--------|--------------------------------------------------------------------------------------|
| direction | string | 默认值是 'horizontal', 值只能够是['horizontal', 'vertical']     |
| flexible     | bool | 可以控制tab的宽度，为true的时候占满外层整个宽度 |
|style | object|设置tabs中element的样式，值按照{tabs: '', tabPanel: '',  tabTitle: ''}形式|
|activeClassName | string | 设置tab处于active状态时的class, 默认是'active' |
|disabledClassName | string | 设置tab处于disabled状态时的class，默认值是'disabled' |

### TabTitle
| Props   | Type | Description               |
|---------|------|---------------------------|
| active  | bool | 初始化并且作为外部进行设置tab的active属性的接口|
| disable | bool | 初始化并且作为外部进行设置tab的disabled属性的接口         |
## changelog

[./CHANGELOG.md](changelog)
