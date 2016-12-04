import React, { Component } from 'react';
import Table from '../index';

const buildData = (total) => {
  const rawData = [];
  for (let i = 0; i < total; i++) {
    rawData.push({
      age: i,
      name: ['liu', 'Liu', 'ma', 'wang', 'wu'][Math.floor(Math.random() * 5)],
      postcode: `10${i}`,
    });
  }
  return rawData;
};

const database = buildData(100);

export default class LazyLoading extends Component {
  constructor(props) {
    super(props);
    const columnData = [
      {
        key: 'age',
        title: '年龄',
        sortable: true,
      },
      {
        key: 'name',
        title: '名字',
        sortable: true,
        sort: (a, b) => {
          const al = a.toLowerCase();
          const bl = b.toLowerCase();

          if (bl < al) {
            return -1;
          }

          if (bl > al) {
            return 1;
          }

          return 0;
        },
      },
      {
        key: 'location',
        title: '地区',
        children: [{
          key: 'province',
          title: '省份',
        }, {
          key: 'city',
          title: '城市',
          children: [{
            key: 'postcode',
            title: '邮编',
          }, {
            key: 'distance',
            title: '距离',
          }, {
            key: 'testing',
            title: '测试',
          }, {
            key: 'phone',
            title: '电话',
            defaultValue: '&nbsp',
          }, {
            key: 'direction',
            title: '方位',
          }],
        }, {
          key: 'population',
          title: '人口',
        }],
      },
      {
        key: 'operation',
        title: '操作',
        content: (record, coordinate) => {
          const { rowNum } = coordinate;
          return (
            <a
              className="link"
              onClick={this.handleDelete.bind(this, rowNum)}>
              删除
            </a>
          );
        },
      },
    ];

    this.state = {
      rawData: this.getData(1, 10),
      columnData,
      pageSize: 10,
      current: 1,
    };
  }

  handleDelete(rowNum) {
    const { rawData, pageSize } = this.state;
    const start = rowNum % pageSize;
    const records = rawData.slice(0, start).concat(rawData.slice(start + 1));
    this.setState({
      rawData: records,
    });
  }

  getData(current, limit) {
    const start = (current - 1) * limit;
    const end = current * limit;
    return database.slice(start, end);
  }

  handleChangeAsync(current, pageSize) {
    setTimeout(() => {
      this.setState({
        rawData: this.getData(current, pageSize),
        current,
      });
    }, 1000);
  }

  render() {
    const { rawData, columnData, current } = this.state;
    return (
      <div>
        <h2>Provide data with simulating async operation</h2>
        <Table
          description={() => {
            return <input placeholder="请输入中文简介" />;
            // return <span>{`${record.name}-${rowNum}`}</span>;
          }}
          rawData={rawData}
          pagination= {{
            onChange: ::this.handleChangeAsync,
            totalPage: 10,
            current,
          }}
          columnData={columnData}>
        </Table>
      </div>
    );
  }
}
