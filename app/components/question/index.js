import React, { Component } from 'react';
import { Card, Button } from 'react-eva';
import * as actions from 'actions/question';

export default class Question extends Component {
  constructor(props) {
    super(props);
  }

  addQuestionGroup() { 
    const { type: { currentType: { supportedLanguages } } } = this.props;
    const blankContents = supportedLanguages.reduce((p, n) => ({
      ...p,
      [n]: {
        title: n,
        description: '',
      },
    }), {});

    const id = Date.now();

    const data = {
      id,
      action: 'add',
      content: blankContents,
    };
    console.log('data : ', data);

    this.props.dispatch(actions.addQuestionGroup(data));
  }

  renderQuestion(content, i) {
    const { title, description } = content;
    return (
      <Card 
        key={i}
        className="question-item"
        title={title}>
        {description || '点击以编辑'}
      </Card>
    );
  }

  renderQuestionGroup() {
    const {
      type: { currentType },
      question: { defaultQuestions, editedQuestions },
    } = this.props;

    console.log('supported languages : ', currentType.supportedLanguages);
    const languages = currentType.supportedLanguages;

    const mergedQuestions = {
      ...defaultQuestions,
      ...editedQuestions,      
    };

    const keys = Object.keys(mergedQuestions);
    const len = keys.length;
    const group = [];

    for (let k = len - 1; k >= 0; k--) {
      const key = keys[k];
      const q = mergedQuestions[key];

      group.push(
        <Card 
          key={k}
          className="question-card">
          <div className="question-group">
            {languages.map((lang, i) => this.renderQuestion(q.content[lang], i))}          
          </div>
        </Card>
      );
    }

    return group;
  }

  renderAddQuestion() {
    return (
      <Button onClick={::this.addQuestionGroup}>
        添加问题
      </Button>
    );
  }

  render() {
    return (
      <Card 
        title="问题列表"
        bordered={false}
        className="question-container"
        extra={this.renderAddQuestion()}>
        {this.renderQuestionGroup()}
      </Card>
    );
  }
}
