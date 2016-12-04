import React, { PropTypes } from 'react';

const Step = (props) => {
  const { status, title, desc } = props;

  return (
    <li className={status}>
      <i className="steps-dot" />
      <div className="steps-title">{title}</div>
      {desc ? (
        <small className="steps-text">{desc}</small>
      ) : null}
    </li>
  );
};

Step.propTypes = {
  status: PropTypes.string,
  title: PropTypes.string,
  desc : PropTypes.string,
};

export default Step;
