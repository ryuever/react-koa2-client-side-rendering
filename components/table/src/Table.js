import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import prefixer from 'react-eva/utils/prefixer';
import Thead from './Thead';
import Tbody from './Tbody';

const noop = () => {};
// 可以通过对column的field进行添加content字段来控制一系列值的显示
export default class Table extends Component {
  static propTypes = {
    style         : PropTypes['object'],
    showHeader    : PropTypes.bool,

    className      : PropTypes.string,
    rowClassName   : PropTypes.string,
    headerClassName: PropTypes.string,

    mergeable          : PropTypes.bool,
    verticalMergeable  : PropTypes.bool,
    horizontalMergeable: PropTypes.bool,
    bidirectionMergeable: PropTypes.bool,

    width : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    keySeperator : PropTypes.string,

    onSelectChange: PropTypes.func,
  }

  static defaultProps = {
    className: 'horizontal',
    selectable: false,

    showHeader: true,
    bidirectionMergeable: false,

    style: {
      table: {},
      td: {},
      th: {},
    },
    onSelect: noop,
    onHeaderSelect: noop,
    onSort: noop,
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { isHeaderVisible } = this.props;
    if (!isHeaderVisible) {
      const node = ReactDOM.findDOMNode(this.refs.table);
      const header = ReactDOM.findDOMNode(this.refs.header);
      const height = window.getComputedStyle(header).height;
      node.style.marginTop = `-${height}`;
    }
  }

  syncHeaderStyle(style) {
    const { syncTableStyle } = this.props;

    if (syncTableStyle) {
      syncTableStyle(style);
    }
  }

  handleMouseEnter(item) {
    const { syncHoveredItem } = this.props;
    if (syncHoveredItem) {
      syncHoveredItem(item);
    }
  }

  handleHeaderSelect(isChecked) {
    const { onHeaderSelect } = this.props;
    onHeaderSelect(isChecked);
  }

  handleSelect(rowNum) {
    const { onSelect } = this.props;
    onSelect(rowNum);
  }

  handleSort(key, action) {
    const { onSort } = this.props;
    onSort(key, action);
  }

  renderHead() {
    const {
      serializable, selectable, style,
      keySeperator, showHeader,
      headerMapping,
      current, pageSize,
      selectedItems,
      displayedData,
    } = this.props;

    if (!showHeader) {
      return null;
    }

    return (
      <Thead
        key="thead"
        ref="header"
        page={current}
        style={style.th || {}}
        pageSize={pageSize}
        selectable={selectable}
        syncHeaderStyle={::this.syncHeaderStyle}
        headerMapping={headerMapping}
        keySeperator={keySeperator}
        serializable={serializable}
        selectedItems={selectedItems}
        onSelect={::this.handleHeaderSelect}
        onSort={::this.handleSort}
        displayedData={displayedData} />
    );
  }

  renderBody() {
    const {
      style, rowClassName,
      serializable, selectable,
      bidirectionMergeable,
      headerMapping,
      displaySeriesKeysMapping,
      displayedData,
      current, pageSize,
      selectedItems,
      activeItem,
      clickedItem,
      description,
      syncClickedItem,
    } = this.props;

    return (
      <Tbody
        key="tbody"
        description={description}
        className={rowClassName}
        page={current}
        style={style.td || {}}
        pageSize={pageSize}
        selectable={selectable}
        serializable={serializable}
        onSelect={::this.handleSelect}
        activeItem={activeItem}
        clickedItem={clickedItem}
        selectedItems={selectedItems}
        headerMapping={headerMapping}
        syncClickedItem={syncClickedItem}
        handleMouseEnter={::this.handleMouseEnter}
        bidirectionMergeable={bidirectionMergeable}
        displaySeriesKeysMapping={displaySeriesKeysMapping}
        displayedData={displayedData} />
    );
  }

  render() {
    const {
      prefix, className,
      style, width, height,
    } = this.props;

    const classes = cx(prefixer('table', prefix), className);
    const tableStyle = Object.assign({}, style.table, { width, height });
    const tableChildren = [];
    tableChildren.push(this.renderHead(), this.renderBody());

    return (
      <table
        ref="table"
        className={classes}
        style={tableStyle}>
        {tableChildren}
      </table>
    );
  }
}
