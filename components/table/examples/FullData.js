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

export default class FullData extends Component {
  constructor(props) {
    super(props);
    const columnData = [
      {
        key: 'age',
        title: '年龄',
        sortable: true,
        freeze: 'left',
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
          }, {
            key: 'direction',
            title: '方位',
            // freeze: 'right',
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
      rawData: database,
      columnData,
      pageSize: 10,
      current: 1,
    };
  }

  handleDelete(rowNum) {
    const { rawData } = this.state;
    const records = rawData.slice(0, rowNum).concat(rawData.slice(rowNum + 1));

    this.setState({
      rawData: records,
    });
  }

  render() {
    const { rawData, columnData } = this.state;
    return (
      <div>
        <h2>Provide full data at one time</h2>
        <Table
          scroll={{
            height: '200px',
            width: '600px',
          }}
          width="1000px"
          rawData={rawData}
          columnData={columnData}
          pagination= {{
            totalPage: 10,
          }}>
        </Table>
      </div>
    );
  }
}
