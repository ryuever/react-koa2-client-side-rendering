/* eslint-disable react/display-name */
import React, { PropTypes } from 'react';
import prefixer from 'react-eva/utils/prefixer';
import cx from 'classnames';

const Card = ({
  prefix,
  className,
  bordered,
  title,
  extra,
  meta,
  foot,
  children,
  ...rest
}) => {
  const prefixCls = prefixer('card', prefix);
  const classes = cx(prefixCls, {
    [`${prefixCls}-bordered`]: bordered,
  }, className);

  const cardMeta = meta ? (
    <h4 className="card-meta">
      {meta}
    </h4>
  ) : null;

  const cardTitleExtra = extra ? (
    <div className="card-title-extra">
      {extra}
    </div>
  ) : null;

  const cardHeader = title ? (
    <div className="card-header">
      <div className="card-title">
        <h3 className="card-title-text">
          {title}
        </h3>
        {cardTitleExtra}
      </div>
      {cardMeta}
    </div>
  ) : null;

  const cardFooter = foot ? (
    <div className="card-footer">
      {foot}
    </div>
  ) : null;

  return (
    <div className={classes} {...rest}>
      {cardHeader}
      <div className="card-body">
        {children}
      </div>
      {cardFooter}
    </div>
  );
};

Card.Image = ({ src, ...otherProps }) => (
  <div className="card-image">
    <img src={src} {...otherProps} />
  </div>
);

Card.defaultProps = {
  bordered: true,
};

Card.propTypes = {
  bordered: PropTypes.bool,
};

export default Card;
