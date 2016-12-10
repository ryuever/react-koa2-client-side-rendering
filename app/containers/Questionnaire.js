import React, { Component } from 'react';
import Card from '../components/card';
import Profile from '../components/profile';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import * as actions from 'actions/questionnaire';
import { Button } from 'react-eva';

class Questionnaire extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    const { dispatch, questionnaire } = this.props;
    console.log('questionnaire : ', questionnaire);
    dispatch(actions.submitQuestionnaire({ 
      name: 'pi',
    }));
  }

  render() {
    return (
      <div className="ng-questionnaire">
        <Profile {...this.props}/>
        <Button
          className="primary"
          type="primary"
          onClick={::this.handleSubmit}>
          提交
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ questionnaire }) => ({
  questionnaire
});

export default connect(mapStateToProps)(Questionnaire);
