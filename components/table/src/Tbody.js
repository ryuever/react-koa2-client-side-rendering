import React, { Component, PropTypes } from 'react';
import TableRow from './TableRow';
import { isFunction } from 'lib/lang';

// 每一个cell都会包含colSpan和rowSpan两个属性；
// 每一个行数据都可以提供一个exceptionalMergeableKeys;
export default class Tbody extends Component {
  static propTypes = {
    displayedData  : PropTypes['array'],
    handleSelect   : PropTypes.func,
    selectedItems  : PropTypes['array'],
  };

  handleSelect(rowNum) {
    const { onSelect } = this.props;
    onSelect(rowNum);
  }

  decorateTableCell() {
    const {
      displayedData, displaySeriesKeysMapping, headerMapping,
      page, pageSize,
    } = this.props;

    const ret = []; // array list;

    /* eslint-disable no-unused-vars */
    let prevRecord;
    /* eslint-enable no-unused-vars */

    let currentRecord = [];
    const keys = Object.keys(displaySeriesKeysMapping);
    displayedData.forEach((data, rowNum) => {
      const rowSpan = data.rowSpan || 1;
      const colSpan = data.colSpan || 1;

      keys.forEach((key, colNum) => {
        const { content, slugKey } = displaySeriesKeysMapping[key];

        const newObj = {};
        newObj.colSpan = colSpan;
        newObj.rowSpan = rowSpan;
        newObj.shouldShow = true;
        const coordinate = {
          rowNum: (page - 1) * pageSize + rowNum,
          colNum,
        };

        if (content && isFunction(content)) {
          newObj.value = content(data, coordinate);
        }

        if (typeof data[key] !== 'undefined') {
          newObj.value = data[key];
        }

        newObj.coordinate = coordinate;
        newObj.isDefaultValue = false;

        if (!newObj.value && headerMapping[slugKey].defaultValue) {
          newObj.isDefaultValue = true;
          newObj.value = headerMapping[slugKey].defaultValue;
        }

        // if value not exist, try to merge cells.
        if (!newObj.value && !headerMapping[slugKey].defaultValue) {
          const mergeCellCoordinate = { rowNum, colNum };
          const mergeMode = this.getMergeMode(data, key, mergeCellCoordinate, ret, currentRecord);

          newObj.shouldShow = false;
          if (mergeMode === 'verticalMerge') {
            newObj.parentCoordinate = {
              rowNum: rowNum - 1,
              colNum,
            };

            newObj.mergeMode = 'verticalMerge';
            ret[rowNum - 1][colNum].rowSpan += rowSpan;   // update parent's value
            ret[rowNum - 1][colNum].mergeMode = 'verticalMerge';
            ret[rowNum - 1][colNum].parentCoordinate = {
              rowNum: rowNum - 1,
              colNum,
            };
          }

          if (mergeMode === 'verticalMergeWithPrev') {
            newObj.mergeMode = 'verticalMergeWithPrev';

            newObj.parentCoordinate = ret[rowNum - 1][colNum].parentCoordinate;
            const x = newObj.parentCoordinate.rowNum;
            const y = newObj.parentCoordinate.colNum;
            ret[x][y].rowSpan += rowSpan;
          }

          if (mergeMode === 'horizontalMerge') {
            newObj.parentCoordinate = {
              rowNum,
              colNum: colNum - 1,
            };
            newObj.mergeMode = 'horizontalMerge';
            currentRecord[colNum - 1].colSpan += colSpan;   // update parent's value
            currentRecord[colNum - 1].mergeMode = 'horizontalMerge';
            currentRecord[colNum - 1].parentCoordinate = {
              rowNum,
              colNum: colNum - 1,
            };
          }

          if (mergeMode === 'horizontalMergeWithPrev') {
            newObj.mergeMode = 'horizontalMergeWithPrev';
            newObj.parentCoordinate = currentRecord[colNum - 1].parentCoordinate;
            // const x = newObj.parentCoordinate.rowNum;
            const y = newObj.parentCoordinate.colNum;
            currentRecord[y].colSpan += colSpan;
          }

          if (mergeMode === 'notMerge') {
            newObj.shouldShow = true;
            newObj.mergeMode = 'notMerge';
          }

          if (mergeMode === 'bidirectionalMerge') {
            newObj.mergeMode = 'bidirectonalMerge';
            newObj.parentCoordinate = {
              rowNum: ret[rowNum - 1][colNum].parentCoordinate ? ret[rowNum - 1][colNum].parentCoordinate.rowNum : rowNum - 1,
              colNum: currentRecord[colNum - 1].parentCoordinate ? currentRecord[colNum - 1].parentCoordinate.colNum : colNum,
            };

            if (newObj.parentCoordinate.colNum === colNum) {
              // no need to calculate col span.
              ret[newObj.parentCoordinate.rowNum][newObj.parentCoordinate.colNum].rowSpan += rowSpan;
            }
          }
        }
        currentRecord.push(newObj);
      });
      prevRecord = currentRecord;
      ret.push([].concat(currentRecord));

      currentRecord = [];
    });

    return ret;
  }

  getMergeMode(data, key, coordinate, ret, currentRecord) {
    const { verticalMergeable, horizontalMergeable } = this.getMergeableProps(data, key);
    const { bidirectionalMergeable } = this.props;
    const { rowNum, colNum } = coordinate;
    const prevRecord = ret[rowNum - 1];
    let prevRecordCell = {};

    // 如果说是table的第一行数据它不被允许尽心vertical merge
    if (verticalMergeable && rowNum !== 0) {
      if (prevRecord) {
        prevRecordCell = prevRecord[colNum];
      }
      if (prevRecordCell) {
        if (!prevRecordCell.mergeMode
          || /verticalMerge/.test(prevRecordCell.mergeMode)
          || prevRecordCell.mergeMode === 'notMerge'
          || prevRecordCell.mergeMode === 'bidirectionalMerge') {
          if (prevRecordCell.shouldShow) {
            return 'verticalMerge';
          }
          return 'verticalMergeWithPrev';
        }
      }
    }

    // 如果说是table的第一列数据它不被允许尽心horizontal merge
    if (horizontalMergeable && colNum !== 0) {
      prevRecordCell = currentRecord[colNum - 1];

      if (prevRecordCell) {
        if (!prevRecordCell.mergeMode
          || /horizontalMerge/.test(prevRecordCell.mergeMode)
          || prevRecordCell.mergeMode === 'notMerge'
          || prevRecordCell.mergeMode === 'bidirectionalMerge') {
          if (prevRecordCell.shouldShow) {
            return 'horizontalMerge';
          }
          return 'horizontalMergeWithPrev';
        }
      }
    }

    if (colNum !== 0 && rowNum !== 0 && bidirectionalMergeable) {
      return 'bidirectionalMerge';
    }

    return 'notMerge';
  }

  isFirstRow() {
    return false;
  }

  isFirstColumn() {
    return false;
  }

  // horizontalMergeable verticalMergeable 默认是true，假如说本身的值为空的话，它会
  // 自动合并到前一个对象上面去（水平和垂直两个方向）。所以它针对的是前面的而言的，不影响后面
  // fields往它上面进行合并。
  // 每一个cell都会有一个参数进行设置 cellHorizontalMergeable cellVeritalMergeable
  getMergeableProps(displayedData, key) {
    const { displaySeriesKeysMapping } = this.props;
    const { exceptionalVerticalMergeableKeys, exceptionalHorizontalMergeableKeys } = displayedData;

    // props from parent is considered as initial
    let verticalMergeable = displaySeriesKeysMapping[key].verticalMergeable;
    let horizontalMergeable = displaySeriesKeysMapping[key].horizontalMergeable;

    if (exceptionalVerticalMergeableKeys) {
      if (exceptionalVerticalMergeableKeys.indexOf(key) !== -1) {
        verticalMergeable = false;
      }
    }

    if (exceptionalHorizontalMergeableKeys) {
      if (exceptionalHorizontalMergeableKeys.indexOf(key) !== -1) {
        horizontalMergeable = false;
      }
    }

    return { verticalMergeable, horizontalMergeable };
  }

  handleMouseEnter(rowNum) {
    const { handleMouseEnter } = this.props;
    handleMouseEnter(rowNum);
  }

  renderChildren() {
    const {
      page, pageSize,
      clickedItem,
      selectable, selectedItems, activeItem,
      className, description,
      headerMapping: { rowConf: { maxColSpan } },
      displayedData,
      syncClickedItem,
    } = this.props;
    const children = [];

    const decoratedRows = this.decorateTableCell();
    const startPosition = (page - 1) * pageSize;

    decoratedRows.forEach((record, key) => {
      const rowNum = startPosition + key;
      children.push(
        <TableRow
          className={className}
          onSelect={::this.handleSelect}
          key={rowNum}
          rowNum={rowNum}
          rowData={record}
          originData={displayedData[key]}
          syncClickedItem={syncClickedItem}
          handleMouseEnter={::this.handleMouseEnter}
          selectedItems={selectedItems}
          activeItem={activeItem}
          selectable={selectable} />
      );

      if (description && clickedItem === rowNum) {
        const rowData = [{
          shouldShow: true,
          colSpan: maxColSpan,
          rowSpan: 1,
          activeItem,
          rowNum,
          value: description(displayedData[key], rowNum),
        }];
        children.push(
          <TableRow
            rowData={rowData}
            className={className}
            key={`${rowNum}-desc`}/>
        );
      }
    });

    return children;
  }

  render() {
    return (
      <tbody>
        {this.renderChildren()}
      </tbody>
    );
  }
}
