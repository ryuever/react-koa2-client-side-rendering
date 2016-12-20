import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TypeDetail from 'components/typeDetail';

const TypeDetailContainer = (props) => {
  return (
    <TypeDetail {...props} />
  );
}

const mapStateToProps = ({ type, option }) => ({
  type, option,
});

export default connect(mapStateToProps)(withRouter(TypeDetailContainer));
