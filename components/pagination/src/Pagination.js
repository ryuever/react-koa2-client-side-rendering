import React, { Component, PropTypes } from 'react';
import cx from  'classnames';
import prefixer from 'react-eva/utils/prefixer';
import { Icon } from 'react-eva';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import '../style.css';

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    const {
      totalPage,
      defaultCurrent,
      pageSize,
    } = props;

    this.state = {
      totalPage,
      current: defaultCurrent,
      pageSize,
    };
    this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
  }

  componentWillMount() {
    const { total, totalPage, pageSize } = this.props;
    let tp = totalPage;

    if (!totalPage) {
      tp = Math.ceil(total / pageSize);

      this.setState({
        totalPage: tp,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      total: nextTotal,
      totalPage: nextTotalPage,
      current: nextCurrent,
      pageSize: nextPageSize,
    } = nextProps;
    const state = {};

    const { pageSize } = this.state;
    if (nextCurrent) {
      state.current = nextCurrent;
    }
    state.pageSize = nextPageSize || pageSize;
    state.totalPage = nextTotalPage || Math.ceil(nextTotal / state.pageSize);

    this.setState(state);
  }

  setCurrent(value) {
    const { onChange } = this.props;
    const { current, pageSize } = this.state;

    let updateValue = value;

    if (current === updateValue) {
      return;
    }
    updateValue = this._toValidPage(updateValue);
    this.setState({
      current: updateValue,
    });

    onChange(updateValue, pageSize);
  }

  _handleClick(value) {
    this.setCurrent(value);
  }

  _rangeJump(flag) {
    const { current } = this.state;
    // const jumpLength = 2 * scope + 1;
    const jumpLength = 4;

    let updateValue;

    if (flag === '1') {
      updateValue = current + jumpLength;
    } else {
      updateValue = current - jumpLength;
    }

    this.setCurrent(updateValue);
  }

  _clickPrev() {
    const { current } = this.state;
    const prevPage = current - 1;
    const cp = prevPage > 0 ? prevPage : current;
    this.setCurrent(cp);
  }

  _clickNext() {
    const { current, totalPage } = this.state;
    const nextPage = current + 1;
    const cp = nextPage < totalPage ? nextPage : totalPage;
    this.setCurrent(cp);
  }

  _toValidPage(page) {
    const { totalPage } = this.state;
    let ret = page;
    if (page < 0) {
      ret = 1;
    }

    if (page > totalPage) {
      ret = totalPage;
    }

    return ret;
  }

  renderPrev() {
    const { simple } = this.props;

    const className = cx({
      ['button']: simple,
      ['page-prev']: !simple,
    });

    let content = '前页';
    if (simple) {
      content = <span className="button-text">{content}</span>;
    }

    return (
      <button
        key="render-prev"
        className={className}
        disabled={this.state.current === 1}
        onClick={::this._clickPrev}>
        <Icon name="chevron-left" />
        {content}
      </button>
    );
  }

  renderNext() {
    const { totalPage, current } = this.state;
    const { simple } = this.props;

    const className = cx({
      ['button']: simple,
      ['page-next']: !simple,
    });

    let content = '下页';
    if (simple) {
      content = <span className="button-text">{content}</span>;
    }

    return (
      <button
        key="render-next"
        className={className}
        disabled={current === totalPage}
        onClick={::this._clickNext}>
        {content}
        <Icon name="chevron-right" />
      </button>
    );
  }

  renderItem(item) {
    const { current } = this.state;
    const { prefix } = this.props;

    const prefixCls = prefixer('page-item', prefix);
    const classes = cx({
      ['current']: item === current,
    }, prefixCls);

    return (
      <li
        key={item}
        className={classes}
        onClick={this._handleClick.bind(this, item)}>{item}</li>
    );
  }

  renderJumpPrev() {
    return (
      <li
        key="ellipsis-prev"
        className="page-jump-prev page-item"
        onClick={::this._rangeJump}>
        <Icon name="ellipsis" />
      </li>
    );
  }

  renderJumpNext() {
    return (
      <li
        key="ellipsis-next"
        className="page-jump-next page-item"
        onClick={this._rangeJump.bind(this, '1')}>
        <Icon name="ellipsis" />
      </li>
    );
  }

  renderPagination() {
    const {
      current,
      totalPage,
    }  = this.state;
    const { simple } = this.props;

    if (simple) {
      return null;
    }

    let heading = 0;
    let ending = 0;

    const elements = [];

    heading = Math.max(1, current - 2);
    ending = Math.min(totalPage, current + 2);

    if (totalPage >= 5) {

      if (totalPage - current <= 2) {
        heading = totalPage - 4;
      }

      if (current < 3) {
        ending = 5;
      }
    }

    for (let i = heading; i <= ending; i++) {
      elements.push(this.renderItem(i));
    }

    if (current - 4 >= 1 && totalPage !== 5 && heading > 2) {
      elements.unshift(this.renderJumpPrev());
    }

    if (heading > 1) {
      elements.unshift(this.renderItem(1));
    }

    if (totalPage - current >= 4 && totalPage !== 5 && totalPage - ending > 1) {
      elements.push(this.renderJumpNext());
    }

    if (totalPage > ending) {
      elements.push(this.renderItem(totalPage));
    }

    return (
      <ul key="page-list" className="page-list">
        {elements}
      </ul>
    );
  }

  handleJump() {
    const input = this.refs.jump.value;

    const current = this._toValidPage(parseInt(input, 10));
    this.setCurrent(current);
  }

  renderJumpInput() {
    const { simple, showJumpInput } = this.props;

    if (simple || !showJumpInput) {
      return null;
    }

    return (
      <div
        key="page-jump"
        className="page-jump">
        <input
          ref="jump"
          type="number"
          min="1" />
        <button
          className="button button-primary"
          onClick={::this.handleJump}>跳页</button>
      </div>
    );
  }

  renderTotalPageText() {
    const { totalPageTextRender } = this.props;
    const { totalPage } = this.state;

    const className = 'total-page-text';

    let content = `共${totalPage}页`;
    if (totalPageTextRender) {
      content = totalPageTextRender(totalPage);
    }

    return (
      <span key="show-total-page" className={className}>
        {content}
      </span>
    );
  }

  renderCurrentPageText() {
    const { currentPageTextRender } = this.props;
    const { current } = this.state;

    const className = 'current-page-text';

    let content = `第${current}页`;
    if (currentPageTextRender) {
      content = currentPageTextRender(current);
    }

    return (
      <span key="show-current" className={className}>
        {content}
      </span>
    );
  }

  renderText() {
    const { simple, showPages } = this.props;

    if (simple || !showPages) {
      return null;
    }

    return (
      <div className="display-text">
        {this.renderCurrentPageText()}
        <i className="page-divider">/</i>
        {this.renderTotalPageText()}
      </div>
    );
  }

  renderPaginator() {
    const ret = [];
    ret.push(this.renderPrev());
    ret.push(this.renderPagination());
    ret.push(this.renderNext());
    ret.push(this.renderJumpInput());
    return ret;
  }

  renderMain() {
    const { simple } = this.props;
    if (simple) {
      return (
        <div className="col-1">
          <div className="button-group">
            {this.renderPaginator()}
          </div>
        </div>
      );
    }
    return this.renderPaginator();
  }

  render() {
    const { simple, prefix } = this.props;
    // 当只有一页的时候直接返回null
    const { totalPage } = this.state;

    if (totalPage === 1) {
      return null;
    }

    const classes = cx(prefixer('pagination', prefix), {
      [prefixer('row', prefix)]: simple,
    });

    return (
      <div className={classes}>
        {this.renderMain()}
        {this.renderText()}
      </div>
    );
  }
}

/* eslint-disable */
const customProp = (props, propName, componentName) => {
  if (!props.total && !props.totalPage) {
    return new Error(
      'Props `total` or `totalPage` is required to `'
      + componentName + '`. Validation failed.'
    );
  }

  if (props[propName] && !/[0-9]+/.test(props[propName])) {
    const type = typeof props[propName];
    return new Error(
      'Invalid prop `' + propName + '` of type `' + type
      + '` supplied to `' + componentName + '`, expected `number`.'
    );
  }
};
/* eslint-enable */

Pagination.propTypes = {
  prefix               : PropTypes.string,
  pageSize             : PropTypes.number,
  defaultCurrent       : PropTypes.number,
  current              : PropTypes.number,
  total                : customProp,
  totalPage            : customProp,
  showPages            : PropTypes.bool,
  showJumpInput        : PropTypes.bool,
  simple               : PropTypes.bool,
  totalPageTextRender  : PropTypes.func,
  currentPageTextRender: PropTypes.func,
  onChange             : PropTypes.func,
};

Pagination.defaultProps = {
  defaultCurrent: 1,
  pageSize: 10,
  showJumpInput: false,
  showPages: true,
};
