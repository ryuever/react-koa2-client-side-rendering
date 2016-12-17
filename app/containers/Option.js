import React, { Component } from 'react';
import Option from 'components/option';
import { connect } from 'react-redux';

const OptionContainer = (props) => {
  return (
    <Option {...props} />
  );
}

const mapStateToProps = ({ type, option }) => ({
  type, option,
});

export default connect(mapStateToProps)(OptionContainer);
