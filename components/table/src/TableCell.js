import React, { Component, PropTypes } from 'react';

export default class TableCell extends Component {
  constructor(props) {
    super(props);
  }

  handleChange() {
    const { onSelect } = this.props;
    onSelect();
  }

  render() {
    const {
      rowSpan, colSpan, children, type,
      checked, className, onClick,
      isDefaultValue,
    } = this.props;

    let value = children;

    if (type === 'checkbox') {
      value = (
        <input
          onChange={::this.handleChange}
          checked={checked}
          type="checkbox" />
      );
    }

    const element = isDefaultValue ? null : value;
    const dangerouslySetInnerHTML = isDefaultValue ? { __html: value } : null;

    return (
      React.createElement('td', {
        dangerouslySetInnerHTML,
        className,
        onClick,
        rowSpan,
        colSpan,
      }, element)
    );
  }
}
TableCell.propTypes = {
  onClick: PropTypes.func,
};

TableCell.defaultProps = {
  onClick: () => {},
};
