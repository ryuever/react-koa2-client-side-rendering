import React, { Component } from 'react';

import Tabs from '../index';
import { Icon } from 'react-eva';

export default class Uncached extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderBasketball() {
    return (
      <Test value={this.state.basketball} />
    );
  }

  renderFootball() {
    return (
      <Test value={this.state.football} />
    );
  }

  renderPingPong() {
    return (
      <Test value={this.state.pingpong} />
    );
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  render() {
    const tabs = [{
      icon: 'basketball',
      title: '篮球',
      component: this.renderBasketball(),
    }, {
      icon: 'football',
      title: '足球',
      component: this.renderFootball(),
      active: true,
    }, {
      icon: 'ping-pong',
      title: '乒乓球',
      component: this.renderPingPong(),
    }];

    const style = {
      tabTitle: {
        width: '200px',
      },
    };

    return (
      <div>
        <input
          onChange={this.handleChange.bind(this, 'basketball')}
          placeholder="for basketball"
          ref="basketball"/>
        <input
          onChange={this.handleChange.bind(this, 'football')}
          placeholder="for football"
          ref="football"/>
        <input
          onChange={this.handleChange.bind(this, 'pingpong')}
          placeholder="for pingpong"
          ref="pingpong"/>
        <Tabs style={style} cached={false}>
          {
            tabs.map((tab, key) => {
              return (
                <Tabs.Item key={key}>
                  <Tabs.TabTitle>
                    <Icon name={tab.icon} />
                    {tab.title}
                  </Tabs.TabTitle>
                  <Tabs.TabPanel>
                    {tab.component}
                  </Tabs.TabPanel>
                </Tabs.Item>
              );
            })
          }
        </Tabs>
      </div>
    );
  }
}

const Test = (props) => {
  const { value } = props;
  return (
    <div>{value}</div>
  );
};
