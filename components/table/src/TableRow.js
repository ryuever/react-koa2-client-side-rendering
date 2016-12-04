import React, { Component } from 'react';
import TableCell from './TableCell';
import cx from 'classnames';

export default class TableRow extends Component {
  handleSelect() {
    const { onSelect, rowNum } = this.props;
    onSelect(rowNum);
  }

  handleMouseEneter() {
    const { handleMouseEnter, rowNum } = this.props;
    if (handleMouseEnter) {
      handleMouseEnter(rowNum);
    }
  }

  handleClick(record, rowNum) {
    const { syncClickedItem } = this.props;
    console.log('sync ', syncClickedItem);
    if (syncClickedItem) {
      syncClickedItem(record, rowNum);
    }
    console.log('click --------');
  }

  render() {
    const {
      rowData, rowNum,
      originData,
      selectable, selectedItems,
      className, activeItem,
    } = this.props;
    const elements = [];

    if (selectable) {
      elements.push(
        <TableCell
          key="select"
          checked={selectedItems.indexOf(rowNum) !== -1}
          onSelect={::this.handleSelect}
          type="checkbox"
          rowSpan={1}
          colSpan={1} />
      );
    }

    rowData.forEach((cell, key) => {
      const { rowSpan, colSpan, value, shouldShow, isDefaultValue } = cell;
      if (shouldShow) {
        elements.push(
          <TableCell
            key={key}
            isDefaultValue={isDefaultValue}
            rowSpan={rowSpan}
            colSpan={colSpan}>
            {typeof value === 'undefined' ? 'null' : value}
          </TableCell>
        );
      }
    });

    const classes = cx({
      'table-row-active': activeItem ? activeItem === rowNum : false,
    }, className);

    return (
      <tr
        onClick={this.handleClick.bind(this, originData, rowNum)}
        onMouseEnter={::this.handleMouseEneter}
        className={classes}>
        {elements}
      </tr>
    );
  }
}
