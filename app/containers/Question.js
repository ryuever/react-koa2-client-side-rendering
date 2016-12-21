import React from 'react';
import { connect } from 'react-redux';
import Question from 'components/question';

const QuestionContainer = (props) => {
  return (
    <Question {...props} />
  );
}

const mapStateToProps = ({ question, type }) => ({
  question, type,
});

export default connect(mapStateToProps)(QuestionContainer);
