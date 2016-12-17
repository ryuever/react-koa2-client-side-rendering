import React, { Component } from 'react';
import { connect } from 'react-redux';
import Type from 'components/type';

const TypeContainer = (props) => {
  return (
    <Type {...props} />
  );
}

const mapStateToProps = ({ type }) => ({
  type,
});

export default connect(mapStateToProps)(TypeContainer);
