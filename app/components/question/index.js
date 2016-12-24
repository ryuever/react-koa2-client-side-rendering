import React, { Component } from 'react';
import { Card, Button, Modal, Form, FormField, Input, Radio } from 'react-eva';
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

  handleInputChange() {

  }

  handleOptionChange() {

  }

  renderQuestionTemplate() {
    const { 
      option: { defaultOptions },
      question: { currentLang },
    } = this.props;
    
    if (defaultOptions.length === 0) {
      return null;
    }

    const options = defaultOptions.map(option => { 
      const content = option.content;
      const len = content.length;
      for (let i = 0; i < len; i++) {
        if (content[i].language === currentLang) {
          return {
            value: content[i]._id,
            desc: content[i].description,
          };
        }
      }
    });

    console.log('options : ', options);

    return (
      <div className="">
        <Form>
          <FormField label="Name">
            <Input
              id="name" 
              onChange={::this.handleInputChange} />
          </FormField>

          <FormField>
            <Radio.Group
              onChange={::this.handleOptionChange}>
              {options.map(option => {
                return (
                  <Radio
                    key={option.value}
                    value={option.value}>
                    {option.desc}
                  </Radio>
                );
              })}
            </Radio.Group>          
          </FormField>
        </Form>
      </div>
    );
  }

  renderQuestionBoard() {
    const { question: { questionBoardVisible } } = this.props;

    return (
      <Modal
        style={{ zIndex: 10 }}
        title="请输入一个问题"
        hideWithRelease
        overlayClassName="modal"
        visible={questionBoardVisible}>
        {this.renderQuestionTemplate()}
      </Modal>
    );
  }

  openQuestionBoard(lang) {
    console.log('open board : ', lang);
    this.props.dispatch(actions.openQuestionModal(lang));
  }

  renderQuestion(content, lang) {
    const { title, description } = content;

    return (
      <Card 
        key={lang}
        onClick={this.openQuestionBoard.bind(this, lang)}
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
            {languages.map(lang => this.renderQuestion(q.content[lang], lang))}          
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
        {this.renderQuestionBoard()}
      </Card>
    );
  }
}
