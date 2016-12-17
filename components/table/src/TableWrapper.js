import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import prefixer from 'react-eva/utils/prefixer';
import { Pagination } from 'react-eva';
import Table from './Table';
import '../style.css';

export default class TableWrapper extends Component {
  static propTypes = {
    prefix        : PropTypes.string,

    rawData       : PropTypes['array'].isRequired,
    columnData    : PropTypes['array'].isRequired,
    handleClick   : PropTypes.func,
    clickToExpand : PropTypes.bool,

    pagination    : React.PropTypes.shape({
      pageSize             : PropTypes.number,
      current              : PropTypes.number,
      showTotalPageText    : PropTypes.bool,
      showCurrentPageText  : PropTypes.bool,
      showInput            : PropTypes.bool,
      simple               : PropTypes.bool,
      totalPageTextRender  : PropTypes.func,
      currentPageTextRender: PropTypes.func,
      onChange             : PropTypes.func,
    }),
  }

  static defaultProps = {
    showPagination: true,
    pagination: {},
    keySeperator: '.',
  }

  constructor(props) {
    super(props);
    const { pagination } = props;
    const defaultPaginationProps = {
      pageSize: 10,
      current: 1,
    };
    const paginationProps = Object.assign({}, defaultPaginationProps, pagination);
    const { pageSize, current } = paginationProps;
    const scrollable = this.checkScrollability(props);

    this.state = {
      current,
      pageSize,
      scrollable,
      activeItem: '',
      selectedItems: [],
      showRightTable: false,
      displayedData: this.getDisplayedData({ current, pageSize }),
    };

    // 包含header中的所有配置信息；其中会牵涉到关于行的最大或者最小span
    this.headerMapping = {
      rowConf: { maxRowSpan: 1, maxColSpan: 0 },
    };

    this.keyOnLeft = '';
    this.keyOnRight = '';
    this.displaySeriesKeysMapping = {};
  }

  componentWillMount() {
    const { columnData } = this.props;
    this.parseHeaderMapping({ data: columnData });
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      showLeftTable: !!this.keyOnLeft,
      showRightTable: !!this.keyOnRight && !this.keyOnLeft,
    });
    /* eslint-enable react/no-did-mount-set-state */
  }

  componentWillReceiveProps(nextProps) {
    const { rawData, pagination: { current, pageSize } } = nextProps;
    const {
      ['current']: stateCurrent,
      ['pageSize']: statePageSize,
    } = this.state;

    const nextCurrent = current || stateCurrent;
    const nextPageSize = pageSize || statePageSize;

    this.setState({
      current: nextCurrent,
      pageSize: nextPageSize,
      displayedData: this.getDisplayedData({
        current: nextCurrent,
        pageSize: nextPageSize,
        rawData,
      }),
    });
  }

  /*
  * get the configuration of rendered table
  */
  adjustSiblingRowSpan(obj, maxRowSpan) {
    const { parentKey } = obj;

    let keys = [];
    if (!parentKey) {
      keys = this.headerMapping.rowConf.childrenKeys;
    } else {
      keys = this.headerMapping[obj.parentKey].childrenKeys;
    }

    keys.forEach((key) => {
      let validKey = key;
      if (parentKey) {
        validKey = `${parentKey}${this.props.keySeperator}${key}`;
      }

      const child = this.headerMapping[validKey];
      if (child) {
        if (child.maxRowSpan < maxRowSpan) {
          child.rowSpan = maxRowSpan - child.maxRowSpan + child.rowSpan;
          child.maxRowSpan = maxRowSpan;
        }
      }
    });
  }

  updateChildrenKeysInParent(parent, childKey) {
    let obj = parent;
    if (!parent) {
      obj = this.headerMapping.rowConf;
    }

    obj.childrenKeys = obj.childrenKeys || [];
    obj.childrenKeys = obj.childrenKeys.concat(childKey);
  }

  updateParent(obj, diffColSpan, diffRowSpan) {
    const options = {
      maxRowSpan: this.addFunc.bind(null, diffRowSpan),
      colSpan: this.addFunc.bind(null, diffColSpan),
    };

    this.updateParentProps(obj, options);

    if (!obj.parentKey) {
      if (obj.maxRowSpan < this.headerMapping.rowConf.maxRowSpan) {
        obj.maxRowSpan = this.headerMapping.rowConf.maxRowSpan - obj.maxRowSpan + 1;
      }

      if (obj.maxRowSpan > this.headerMapping.rowConf.maxRowSpan) {
        this.headerMapping.rowConf.maxRowSpan = obj.maxRowSpan;
      }
    }

    const { parentKey } = obj;
    if (parentKey) {
      const parentProps = this.headerMapping[parentKey];
      this.updateParent(parentProps, diffColSpan, diffRowSpan);
    }
  }

  parseHeaderMapping(options) {
    const { parentKey, data } = options;
    const glMergeable = this.props.mergeable;
    const glVerticalMergeable = this.props.verticalMergeable;
    const glHorizontalMergeable = this.props.horizontalMergeable;

    let colSpanExtended = 0;
    let sameLevelMaxRowSpan = 1;

    data.forEach((header) => {
      const {
        freeze,
        width, height,
        className,
        children, key,
        colSpan, rowSpan,
        content, title, defaultValue,
        sortable, sort, lazySorting,
        mergeable, horizontalMergeable, verticalMergeable,
      } = header;
      const validKey = this.toValidKey(parentKey, key);

      if (freeze === 'left') {
        this.keyOnLeft = validKey;
      }

      if (freeze === 'right') {
        this.keyOnRight = validKey;
      }

      const validColSpan = colSpan || 1;
      const validRowSpan = rowSpan || 1;
      this.headerMapping[validKey] = {
        width, height,
        title, defaultValue,
        sort, className,
        lazySorting: lazySorting || false,
        sortable: sortable || false,
        colSpan: validColSpan,
        rowSpan: validRowSpan,
        maxRowSpan: validRowSpan,
      };

      colSpanExtended += validColSpan;

      // Top level items don't have parentKey;
      if (parentKey) {
        this.headerMapping[validKey].parentKey = parentKey;
      }
      this.updateChildrenKeysInParent(this.headerMapping[parentKey], key);

      if (children) {
        const options = {
          parentKey: validKey,
          data: header.children,
        };
        this.parseHeaderMapping(options);
      } else {
        this.headerMapping.rowConf.maxColSpan += this.headerMapping[validKey].colSpan;

        this.displaySeriesKeysMapping[key] = {
          content,
          slugKey: validKey,
          horizontalMergeable: this.checkMergeable(
            [horizontalMergeable, mergeable, glHorizontalMergeable, glMergeable]
          ),
          verticalMergeable: this.checkMergeable(
            [verticalMergeable, mergeable, glVerticalMergeable, glMergeable]
          ),
        };
      }

      if (this.headerMapping[validKey].maxRowSpan > sameLevelMaxRowSpan) {
        this.adjustSiblingRowSpan(
          this.headerMapping[validKey],
          this.headerMapping[validKey].maxRowSpan
        );
        sameLevelMaxRowSpan = this.headerMapping[validKey].maxRowSpan;
      }

      if (this.headerMapping[validKey].maxRowSpan < sameLevelMaxRowSpan) {
        this.headerMapping[validKey].rowSpan
          += sameLevelMaxRowSpan - this.headerMapping[validKey].maxRowSpan;
        this.headerMapping[validKey].maxRowSpan = sameLevelMaxRowSpan;
      }
    });

    if (parentKey) {
      const parent = this.headerMapping[parentKey];
      const diffColSpan = colSpanExtended - 1;

      let diffRowSpan = sameLevelMaxRowSpan - (parent.maxRowSpan - parent.rowSpan);
      if (diffRowSpan < 0) {
        diffRowSpan = 0;
      }

      this.updateParent(parent, diffColSpan, diffRowSpan);
    }
  }

  // 一次提供了所有的数据
  // 如果说pagination中没有提供onChange这个方法的话，就认为是不需要lazy loading
  shouldLazyLoading() {
    const { pagination: { onChange } } = this.props;

    const onChangeType = typeof onChange;
    if (onChangeType !== 'undefined' && onChangeType === 'function') {
      return true;
    }

    return false;
  }

  toValidKey(parentKey, key) {
    const { keySeperator } = this.props;

    if (parentKey) {
      return `${parentKey}${keySeperator}${key}`;
    }
    return key;
  }

  checkMergeable(arr) {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
      if (typeof arr[i] !== 'undefined') {
        return arr[i];
      }
    }
    return true;
  }

  /*
  * object with { field: func } pair
  * update parent's maxRowSpan, colSpan property
  */
  updateParentProps(obj, options) {
    Object.keys(options).forEach((key) => {
      obj[key] = options[key].call(null, obj[key]);
    });
  }

  addFunc(value, step) {
    const val = parseInt(value || 1, 10);
    if (step) {
      return val + step;
    }
    return val + 1;
  }

  handleSelect(rowNum) {
    const { selectedItems } = this.state;
    const index = selectedItems.indexOf(rowNum);

    if (index === -1) {
      this.setState({
        selectedItems: selectedItems.concat(rowNum),
      });
    } else {
      // unselect item
      this.setState({
        selectedItems: this.itemRemove(selectedItems, index),
      });
    }
  }

  handleHeaderSelect(isChecked) {
    const { displayedData, selectedItems, current, pageSize } = this.state;
    const startIndex = (current - 1) * pageSize;

    const newSelectedItems = [];
    const selectedItemsBk = [].concat(selectedItems);

    for (let key = 0; key < displayedData.length; key++) {
      const index = startIndex + key;
      if (isChecked) {
        if (selectedItems.indexOf(index) === -1) {
          newSelectedItems.push(index);
        }
      } else {
        selectedItemsBk.splice(startIndex, 1);
      }
    }

    if (isChecked) {
      this.setState({
        selectedItems: selectedItems.concat(newSelectedItems),
      });
    } else {
      this.setState({
        selectedItems: selectedItemsBk,
      });
    }
  }

  itemRemove(arr, index, step) {
    return arr.slice(0, index).concat(arr.slice(index + (step || 1)));
  }

  /* eslint-disable consistent-return */
  handleSort(key, action) {
    const { current, pageSize } = this.state;
    const { rawData } = this.props;
    const { lazySorting, sort } = this.headerMapping[key];

    if (lazySorting) {
      return sort(current, pageSize, action);
    }

    rawData.sort((a, b) => {
      if (action === 'des') {
        if (sort) {
          return sort(a[key], b[key]);
        }
        return b[key] - a[key];
      }

      if (sort) {
        return sort(b[key], a[key]);
      }
      return a[key] - b[key];
    });

    this.setState({
      selectedItems: [],
      displayedData: this.getDisplayedData({ current }),
    });
  }
  /* eslint-enable consistent-return */

  getDisplayedData({ current, pageSize, rawData }) {
    // const { rawData } = this.props;
    const data = rawData || this.props.rawData;
    const limit = pageSize || this.state.pageSize;

    if (this.shouldLazyLoading()) {
      return data;
    }

    const startRowNum = (current - 1) * limit;
    const endRowNum = startRowNum + limit;
    const subData = data.slice(startRowNum, endRowNum) || [];

    return subData;
  }

  strToInt(str) {
    return parseInt(str, 10);
  }

  checkScrollability(props) {
    const { scroll } = props;
    if (scroll) {
      const { width, height } = scroll;

      if (width || height) {
        return true;
      }

      return false;
    }

    return false;
  }

  handleScrollHeader(ref) {
    const node = ReactDOM.findDOMNode(this.refs[ref]);
    if (node) {
      const scrollLeft = node.scrollLeft;
      this.horizontalScrollUpdate(ref, scrollLeft);
    }
  }

  handleScrollBody(ref) {
    const node = ReactDOM.findDOMNode(this.refs[ref]);
    if (node) {
      const scrollLeft = node.scrollLeft;
      const scrollTop = node.scrollTop;

      this.verticalScrollUpdate(ref, scrollTop);
      this.horizontalScrollUpdate(ref, scrollLeft);
    }
  }

  horizontalScrollUpdate(ref, scrollLeft) {
    const keys = [
      'table-body-on-center-container',
      'table-header-on-center-container',
    ];

    const { showLeftTable, showRightTable } = this.state;
    const { width, scroll: { width: scrollWidth } } = this.props;
    const scrollLeftMaxValue = parseInt(width, 10) - parseInt(scrollWidth, 10);
    if (scrollLeft <= 0) {
      if (showRightTable && this.keyOnLeft) {
        this.setState({
          showLeftTable: true,
          showRightTable: false,
        });
      }
    } else if (scrollLeft >= scrollLeftMaxValue) {
      if (showLeftTable && this.keyOnRight) {
        this.setState({
          showLeftTable: false,
          showRightTable: true,
        });
      }
    } else {
      /* eslint-disable no-lonely-if */
      if (!showLeftTable || !showRightTable) {
        this.setState({
          showLeftTable: true,
          showRightTable: true,
        });
      }
      /* eslint-enable no-lonely-if */
    }

    keys.forEach((key) => {
      const node = ReactDOM.findDOMNode(this.refs[key]);
      if (key !== ref && node) {
        node.scrollLeft = scrollLeft;
      }
    });
  }

  verticalScrollUpdate(ref, scrollTop) {
    const keys = [
      'table-body-on-left-container',
      'table-body-on-center-container',
      'table-body-on-right-container',
    ];

    keys.forEach((key) => {
      const node = ReactDOM.findDOMNode(this.refs[key]);
      if (key !== ref && node) {
        node.scrollTop = scrollTop;
      }
    });
  }

  getKeysOnPanel(freezeKey, headerMapping) {
    const keys = Object.keys(headerMapping);
    const keysOnLeftPanel = keys.slice(1, keys.indexOf(freezeKey) + 1);

    const childrenKeys = this.appendChildrenKeys(freezeKey, headerMapping);
    return keysOnLeftPanel.concat(childrenKeys);
  }

  appendChildrenKeys(freezeKey, headerMapping) {
    const keys = [];
    if (headerMapping[freezeKey].childrenKeys) {
      headerMapping[freezeKey].childrenKeys.forEach(key => {
        keys.push(`${freezeKey}.${key}`);
        keys.concat(this.appendChildrenKeys(`${freezeKey}.${key}`, headerMapping));
      });
    } else {
      keys.push(freezeKey);
    }

    return keys;
  }

  updateKeyMapping(panelKey, direction) {
    const { tableStyle } = this.state;
    const headerMapping = this.headerMapping;
    const displaySeriesKeysMapping = this.displaySeriesKeysMapping;

    if (!panelKey || !tableStyle) {
      return null;
    }

    let panelKeys = [];
    if (direction === 'left') {
      panelKeys = this.getKeysOnPanel(this.keyOnLeft, headerMapping);
    } else {
      const keys = Object.keys(headerMapping);
      panelKeys = this.getParentKeys(this.keyOnRight, headerMapping);
      panelKeys = panelKeys.concat(keys.slice(keys.indexOf(this.keyOnRight)));
    }

    const newHeaderMapping = { rowConf: { childrenKeys: [] } };
    let newDisplaySeriesKeysMapping = {};
    const childrenWidth = {};
    const childrenStore = {};
    const childrenColSpan = {};

    for (let i = panelKeys.length - 1; i >= 0; i--) {
      const key = panelKeys[i];
      const obj = headerMapping[key];
      const { left, right, top, bottom } = tableStyle[key];

      if (!obj.childrenKeys) {
        newHeaderMapping[key] = Object.assign({}, headerMapping[key], {
          width: `${right - left}px`,
          height: `${bottom - top}px`,
        });
        childrenWidth[key] = right - left;
        childrenColSpan[key] = headerMapping[key].colSpan;
      } else {
        newHeaderMapping[key] = Object.assign({}, headerMapping[key], {
          width: childrenWidth[key],
          height: `${bottom - top}px`,
          childrenKeys: childrenStore[key],
          colSpan: childrenColSpan[key],
        });
      }

      const disKey = key.split(this.props.keySeperator).pop();

      if (obj.parentKey) {
        childrenWidth[obj.parentKey]
          = childrenWidth[obj.parentKey]
          ? childrenWidth[obj.parentKey] + childrenWidth[key]
          : childrenWidth[key];

        if (childrenStore[obj.parentKey]) {
          childrenStore[obj.parentKey].unshift(disKey);
        } else {
          childrenStore[obj.parentKey] = [disKey];
        }

        childrenColSpan[obj.parentKey]
          = childrenColSpan[obj.parentKey]
          ? childrenColSpan[obj.parentKey] + childrenColSpan[key]
          : childrenColSpan[key];
      } else {
        newHeaderMapping.rowConf.childrenKeys.unshift(key);
      }

      if (displaySeriesKeysMapping[disKey]) {
        newDisplaySeriesKeysMapping[disKey]
          = Object.assign({}, displaySeriesKeysMapping[disKey]);
      }
    }

    newDisplaySeriesKeysMapping = this.reverseObj(newDisplaySeriesKeysMapping);
    return { newHeaderMapping, newDisplaySeriesKeysMapping };
  }

  renderTableOnLeft() {
    const keyMapping = this.updateKeyMapping(this.keyOnLeft, 'left');
    if (!keyMapping) {
      return null;
    }
    const { newHeaderMapping, newDisplaySeriesKeysMapping } = keyMapping;

    return (
      <div
        key="table-on-left"
        className="table-on-left">
        {this.renderTableHeaderOnLeft(newHeaderMapping)}
        {this.renderTableBodyOnLeft(newHeaderMapping, newDisplaySeriesKeysMapping)}
      </div>
    );
  }

  renderTableHeaderOnLeft(newHeaderMapping) {
    const options = {
      key: 'table-header-on-left',
      displayedData: [],
      headerMapping: newHeaderMapping,
      displaySeriesKeysMapping: {},
    };

    return (
      <div
        key="table-header-on-left-container"
        className="table-header-on-left-container"
        onScroll={this.handleScrollHeader.bind(this, 'table-header-on-left-container')}>
        {this.renderTable(options)}
      </div>
    );
  }

  renderTableBodyOnLeft(newHeaderMapping, newDisplaySeriesKeysMapping) {
    const { scroll } = this.props;

    const options = {
      key: 'table-body-on-left',
      isHeaderVisible: false,
      headerMapping: newHeaderMapping,
      displaySeriesKeysMapping: newDisplaySeriesKeysMapping,
    };

    return (
      <div
        style={{
          height: scroll.height,
          overflowY: 'auto',
        }}
        key="table-body-on-left-container"
        ref="table-body-on-left-container"
        className="table-body-on-left-container"
        onScroll={this.handleScrollBody.bind(this, 'table-body-on-left-container')}>
        {this.renderTable(options)}
      </div>
    );
  }

  reverseObj(obj) {
    const keys = Object.keys(obj);
    const reversedObj = {};
    for (let key = keys.length - 1; key >= 0; key--) {
      reversedObj[keys[key]] = obj[keys[key]];
    }

    return reversedObj;
  }

  getParentKeys(keyOnRight, headerMapping) {
    const keys = [];
    const parentKey = headerMapping[keyOnRight].parentKey;

    if (parentKey) {
      keys.unshift(parentKey);
      Array.prototype.unshift.apply(keys, this.getParentKeys(parentKey, headerMapping));
    }

    return keys;
  }

  renderTableOnRight() {
    const keyMapping = this.updateKeyMapping(this.keyOnRight, 'right');
    if (!keyMapping) {
      return null;
    }
    const { newHeaderMapping, newDisplaySeriesKeysMapping } = keyMapping;

    return (
      <div
        key="table-on-right"
        className="table-on-right">
        {this.renderTableHeaderOnRight(newHeaderMapping)}
        {this.renderTableBodyOnRight(newHeaderMapping, newDisplaySeriesKeysMapping)}
      </div>
    );
  }

  renderTableHeaderOnRight(newHeaderMapping) {
    const options = {
      key: 'table-header-on-right',
      displayedData: [],
      headerMapping: newHeaderMapping,
      displaySeriesKeysMapping: {},
    };
    return (
      <div
        key="table-header-on-right-container"
        className="table-header-on-right-container"
        onScroll={this.handleScrollHeader.bind(this, 'table-header-on-right-container')}>
        {this.renderTable(options)}
      </div>
    );
  }

  renderTableBodyOnRight(newHeaderMapping, newDisplaySeriesKeysMapping) {
    const { scroll } = this.props;
    const options = {
      key: 'table-fixed-left-body',
      isHeaderVisible: false,
      headerMapping: newHeaderMapping,
      displaySeriesKeysMapping: newDisplaySeriesKeysMapping,
    };

    return (
      <div
        style={{
          overflowY: 'auto',
          height: scroll.height,
        }}
        key="table-body-on-right-container"
        ref="table-body-on-right-container"
        className="table-body-on-right-container"
        onScroll={this.handleScrollBody.bind(this, 'table-body-on-right-container')}>
        {this.renderTable(options)}
      </div>
    );
  }

  renderTableOnCenter() {
    return (
      <div
        key="table-on-center"
        className="table-on-center">
        {this.renderTableHeaderOnCenter()}
        {this.renderTableBodyOnCenter()}
      </div>
    );
  }

  renderTableHeaderOnCenter() {
    const { width, scroll } = this.props;
    const { tableStyle } = this.state;

    let height = '';
    if (tableStyle) {
      const { rowConf: { top, bottom } } = tableStyle;
      height = `${bottom - top}px`;
    }

    const options = {
      width,
      displayedData: [],
      key: 'table-header-on-center',
      syncTableStyle: ::this.syncTableStyle,
      headerMapping: this.headerMapping,
      displaySeriesKeysMapping: this.displaySeriesKeysMapping,
    };

    return (
      <div
        style={{
          width: scroll.width,
          height,
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
        ref="table-header-on-center-container"
        onScroll={this.handleScrollHeader.bind(this, 'table-header-on-center-container')}
        className="table-header-on-center-container">
        {this.renderTable(options)}
      </div>
    );
  }

  renderTableBodyOnCenter() {
    const { width, scroll } = this.props;

    const options = {
      width,
      key: 'table-body-on-center',
      isHeaderVisible: false,
      syncHoveredItem: ::this.syncHoveredItem,
      syncClickedItem: ::this.syncClickedItem,
      headerMapping: this.headerMapping,
      displaySeriesKeysMapping: this.displaySeriesKeysMapping,
    };

    return (
      <div
        style={{
          width: scroll.width,
          height: scroll.height,
          overflowX: 'auto',
          overflowY: 'auto',
        }}
        key="table-body-on-center-container"
        ref="table-body-on-center-container"
        onScroll={this.handleScrollBody.bind(this, 'table-body-on-center-container')}
        className="table-body-on-center-container">
        {this.renderTable(options)}
      </div>
    );
  }

  handlePageChange(nextCurrent, pageSize) {
    const { pagination: { onChange } } = this.props;

    if (onChange) {
      onChange(nextCurrent, pageSize);
      return;
    }

    this.setState({
      current: nextCurrent,
      pageSize,
      displayedData: this.getDisplayedData({
        current: nextCurrent,
        pageSize,
      }),
    });
  }

  syncTableStyle(tableStyle) {
    this.setState({ tableStyle });
  }

  syncHoveredItem(item) {
    this.setState({
      activeItem: item,
    });

    const { onHover } = this.props;
    if (onHover) {
      onHover(item);
    }
  }

  syncClickedItem(record, item) {
    const { handleClick } = this.props;

    this.setState({
      clickedItem: item,
    });

    if (handleClick) {
      handleClick(record);
    }
  }

  renderNormalTable() {
    const { width, height } = this.props;
    const options = {
      key: 'table',
      width,
      height,
      headerMapping: this.headerMapping,
      syncHoveredItem: ::this.syncHoveredItem,
      syncClickedItem: ::this.syncClickedItem,
      displaySeriesKeysMapping: this.displaySeriesKeysMapping,
    };

    return this.renderTable(options);
  }

  renderTable(options) {
    const {
      current, pageSize,
      clickedItem,
      selectedItems, activeItem, displayedData,
    } = this.state;
    const { key, isHeaderVisible } = options;
    const { description } = this.props;

    return (
      <Table
        key={key}
        ref={key}
        current={current}
        pageSize={pageSize}
        isHeaderVisible={typeof isHeaderVisible === 'undefined' ? true : isHeaderVisible}
        onHeaderSelect={::this.handleHeaderSelect}
        onSelect={::this.handleSelect}
        onSort={::this.handleSort}
        activeItem={activeItem}
        clickedItem={clickedItem}
        displayedData={displayedData}
        selectedItems={selectedItems}
        description={description}
        {...options}/>
    );
  }

  renderPagination() {
    const { pagination, showPagination, rawData } = this.props;
    const { pageSize, current } = this.state;

    if (rawData.length === 0 || !showPagination) {
      return null;
    }

    let totalPage = 1;
    if (pagination.totalPage) {
      totalPage = pagination.totalPage;
    } else {
      totalPage = Math.ceil(rawData.length / pageSize);
    }

    return (
      <Pagination
        key="pagination"
        {...pagination}
        current={current}
        pageSize={pageSize}
        totalPage={totalPage}
        onChange={::this.handlePageChange} />
    );
  }

  render() {
    const { className, showPagination, prefix, scroll } = this.props;
    const { scrollable, showLeftTable, showRightTable } = this.state;
    const children = [];

    // only if showPagination is set as false manually and the container is not scollable,
    // return a component using <table> as top level tag.
    if (!scrollable) {
      if (!showPagination) {
        return this.renderNormalTable();
      }
      children.push(this.renderNormalTable());
    } else {
      if (showLeftTable && this.keyOnLeft) {
        children.push(this.renderTableOnLeft());
      }
      children.push(this.renderTableOnCenter());
      if (showRightTable && this.keyOnRight) {
        children.push(this.renderTableOnRight());
      }
    }

    if (showPagination) {
      children.push(this.renderPagination());
    }

    const classes = cx(prefixer('table-container', prefix), className, {
      'table-scrollable-container': scrollable,
      'table-normal-container': !scrollable,
    });

    return (
      <div
        style={{
          width: scroll ? scroll.width : '',
        }}
        key="container"
        className={classes}>
        {children}
      </div>
    );
  }
}
