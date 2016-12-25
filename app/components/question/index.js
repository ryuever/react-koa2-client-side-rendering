import React, { Component } from 'react';
import { Card, Button, Modal, Form, FormField, Input, Checkbox } from 'react-eva';
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
        title: '',
        description: '',
        options: [],
      },
    }), {});

    const id = Date.now();

    const data = {
      id,
      action: 'add',
      content: blankContents,
    };

    this.props.dispatch(actions.addQuestionGroup(data));
  }

  handleInputChange(e) {
    const { 
      question: { currentLang, currentId },
      dispatch,
    } = this.props;
    console.log('current : ', currentLang, currentId, e.target.value);
    // 如果说是default的话，那么就是保存optionId
    // 如果说不是的话，    
    const data = {
      title: e.target.value,
      currentId,
      currentLang,
    };

    dispatch(actions.setQuestionTitle(data));
  } 

  handleOptionChange(value) {
    const { 
      question: { currentLang, currentId },
      dispatch,
    } = this.props;
    console.log('current : ', currentLang, currentId, value);
    // 如果说是default的话，那么就是保存optionId
    // 如果说不是的话，    
    const data = {
      value,
      currentId,
      currentLang,
    };

    dispatch(actions.setChoosenDefault(data));
  }

  renderQuestionTemplate() {
    const { 
      option: { defaultOptions },
      question: { currentLang, currentId, editedQuestions },
    } = this.props;
    
    if (defaultOptions.length === 0 || !currentLang) {
      return null;
    }

    const options = defaultOptions.map(option => { 
      const content = option.content;
      const len = content.length;
      for (let i = 0; i < len; i++) {
        if (content[i].language === currentLang) {
          return {
            value: content[i]._id,
            label: content[i].description,
          };
        }
      }
    });

    console.log('options : ', options);

    const checkboxValues = editedQuestions[currentId].content[currentLang].options;
    const inputValue = editedQuestions[currentId].content[currentLang].title;
    console.log('check box values : ', checkboxValues, inputValue);

    return (
      <div className="">
        <Form>
          <FormField label="Name">
            <Input
              id="name" 
              value={inputValue}
              onChange={::this.handleInputChange} />
          </FormField>

          <FormField>
            <Checkbox.Group
              value={checkboxValues || ''}
              onChange={::this.handleOptionChange}>
              {options.map(option => {
                return (
                  <Checkbox
                    key={option.value}
                    value={option.value}>
                    {option.label}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>          
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

  openQuestionBoard(lang, id) {
    console.log('open board : ', lang);
    this.props.dispatch(actions.openQuestionModal({
      lang, id
    }));
  }

  renderQuestion(p, lang) {
    const id = p.id;
    const content = p.content[lang];
    const { title, description } = content;

    return (
      <Card 
        key={lang}
        onClick={this.openQuestionBoard.bind(this, lang, id)}
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
      console.log('q : ', q);

      group.push(
        <Card 
          key={k}
          className="question-card">
          <div className="question-group">
            {languages.map(lang => this.renderQuestion(q, lang))}          
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
