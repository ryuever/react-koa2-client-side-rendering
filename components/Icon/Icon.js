import React from 'react';
import cx from 'classnames';
import { isPresent } from 'lib/lang';

const Icon = ({ name, className, ...rest }) => (
  <i {...rest} className={cx(className, {
    [`icon-${name}`]: isPresent(name),
  })} />
);

export default Icon;
