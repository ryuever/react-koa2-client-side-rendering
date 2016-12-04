import React, { Component } from 'react';
import Pagination from '../index';

export default class Customization extends Component {
  constructor(props) {
    super(props);
    const {
      total,
      pageSize,
      current,
      scope,
    } = props;

    this.state = {
      total,
      pageSize,
      current,
      scope,
    };
  }

  onChange(value) {
    console.log('current page : ', value);
  }

  _createRandomInt(options) {
    const { max, min } = options;

    // 创建 [min, max] 之间的随机整数
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  _handleCurrentClick() {
    const { total, pageSize } = this.state;
    const totalPage = Math.ceil(total / pageSize);
    const random = this._createRandomInt({
      min: 1,
      max: totalPage,
    });

    console.log('current random : ', random);
    this.setState({
      current: random,
    });
  }

  _handleTotalClick() {
    const random = this._createRandomInt({
      min: 0,
      max: 1001,
    });

    console.log('total random : ', random);
    this.setState({
      total: random,
    });
  }

  _handleScopeClick() {
    const { total } = this.state;
    const scope = Math.floor((total - 1) / 2);
    const random = this._createRandomInt({
      min: 3,
      max: Math.min(scope, 7),
    });

    console.log('scope random : ', random);

    this.setState({
      scope: random,
    });
  }

  _handlePageSizeClick() {
    const random = this._createRandomInt({
      min: 5,
      max: 30,
    });

    console.log('page size random : ', random);

    this.setState({
      pageSize: random,
    });
  }

  render() {

    const {
      total,
      current,
      scope,
      pageSize,
    } = this.state;

    return (
      <div>
        <button
          key="current"
          className="button"
          onClick={::this._handleCurrentClick}>控制current(不大于30的随机整数)</button>
        <button
          key="total"
          className="button"
          onClick={::this._handleTotalClick}>控制total(不大于100的随机整数)</button>
        <button
          key="pageSize"
          className="button"
          onClick={::this._handlePageSizeClick}>控制page size(不大于30的随机整数)</button>
        <Pagination
          showTotalPageText
          showCurrentPageText
          current={current}
          pageSize={pageSize}
          scope={scope}
          total={total}
          onChange={::this.onChange}/>
      </div>
    );
  }
}

Customization.defaultProps = {
  current: 2,
  total: 30,
  pageSize: 10,
  scope: 3,
};
