import React from 'react';
import { connect } from 'react-redux';
import Question from 'components/question';

const QuestionContainer = (props) => {
  return (
    <Question {...props} />
  );
}

const mapStateToProps = ({ question, type, option }) => ({
  question, type, option,
});

export default connect(mapStateToProps)(QuestionContainer);
