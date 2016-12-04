import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'react-eva';
import cx from 'classnames';

export default class Thead extends Component {
  static propTypes = {
    displayedData  : PropTypes['array'],
    columnData     : PropTypes['array'],
    handleSelect   : PropTypes.func,
    onSort         : PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.isChecked = false;
    this.sortProps = {};
  }

  componentDidMount() {
    const { syncHeaderStyle } = this.props;

    const keys = Object.keys(this.props.headerMapping);
    const headerNodeStyle = {};

    for (let key = 0; key < keys.length; key++) {
      const node = ReactDOM.findDOMNode(this.refs[keys[key]]);

      // to ignore the key with value of 'rowConf'
      if (node) {
        headerNodeStyle[keys[key]] = node.getBoundingClientRect();
      }
    }

    headerNodeStyle.rowConf = ReactDOM.findDOMNode(this).getBoundingClientRect();

    if (syncHeaderStyle) {
      syncHeaderStyle(headerNodeStyle);
    }
  }

  handleSelect() {
    const { onSelect } = this.props;
    this.isChecked = !this.isChecked;
    onSelect(this.isChecked);
  }

  hasChecked() {
    const { page, pageSize, selectedItems, displayedData } = this.props;

    const startRowNum = pageSize * (page - 1);
    const length = displayedData.length;

    if (length === 0) {
      this.isChecked = false;
      return false;
    }

    for (let key = 0; key < length; key++) {
      const index = startRowNum + key;
      if (selectedItems.indexOf(index) === -1) {
        this.isChecked = false;
        return false;
      }
    }

    this.isChecked = true;
    return true;
  }

  renderSelector() {
    const { headerMapping: { rowConf: { maxRowSpan } } } = this.props;

    return (
      <th
        colSpan={1}
        key="select"
        rowSpan={maxRowSpan}>
        <input
          checked={this.hasChecked()}
          onChange={::this.handleSelect}
          type="checkbox" />
      </th>
    );
  }

  handleSort(key, action) {
    const { onSort } = this.props;
    onSort(key, action);

    this.sortProps[key] = action;
  }

  toggleElementSort(key) {
    const { headerMapping } = this.props;

    if (!headerMapping[key].sortable) {
      return;
    }

    if (!this.sortProps[key] || this.sortProps[key] === 'des') {
      this.sortProps[key] = 'asc';
    } else {
      this.sortProps[key] = 'des';
    }

    this.handleSort(key, this.sortProps[key]);
  }

  renderSortIcons(key) {
    const { headerMapping } = this.props;
    if (headerMapping[key].sortable) {
      let upClassName = 'sort-icon';
      let downClassName = 'sort-icon';

      if (this.sortProps[key]) {
        upClassName = cx(upClassName, {
          active: this.sortProps[key] === 'asc',
        });
        downClassName = cx(downClassName, {
          active: this.sortProps[key] === 'des',
        });
      }

      return (
        <div className="table-sorter">
          <div
            className={upClassName}>
            <Icon key="up" name="chevron-up" />
          </div>
          <div
            className={downClassName}>
            <Icon key="down" name="chevron-down" />
          </div>
        </div>
      );
    }

    return null;
  }

  renderHeader(data, count, isFirstRow) {
    const { headerMapping, selectable } = this.props;
    let ret = '<tr>';
    let keysToRender = [];
    const ths = [];

    const number = count || 0;

    if (isFirstRow && selectable) {
      ths.push(this.renderSelector());
    }

    Object.keys(data).forEach((key) => {
      const { rowSpan, colSpan, childrenKeys, title, className } = data[key];
      const { sortable, width, height } = headerMapping[key];
      const headerClassName = cx('table-header', { sortable }, className);
      const style = { width, height };

      const element = (
        <th
          key={key}
          ref={key}
          style={style}
          rowSpan={rowSpan}
          colSpan={colSpan}
          onClick={this.toggleElementSort.bind(this, key)}
          className={headerClassName}>
          {title}
          {this.renderSortIcons(key)}
        </th>
      );
      ths.push(element);

      if (childrenKeys) {
        const keys = childrenKeys.map((child) => (
          // `${key}${this.props.keySeperator}${child}`
          `${key}.${child}`
        ));
        keysToRender = keysToRender.concat(keys);
      }
    });
    ret = (
      <tr key={number}>
        {ths}
      </tr>
    );

    const childrenData = {};
    keysToRender.forEach((key) => {
      childrenData[key] = headerMapping[key];
    });

    let childrenElement = [];

    if (keysToRender.length > 0) {
      childrenElement = this.renderHeader(childrenData, number + 1);
    }

    return [ret].concat(childrenElement);
  }

  render() {
    const { headerMapping } = this.props;

    const data = {};
    headerMapping.rowConf.childrenKeys.forEach((key) => {
      data[key] = headerMapping[key];
    });

    return (
      <thead>
        {this.renderHeader(data, 0, true)}
      </thead>
    );
  }
}
