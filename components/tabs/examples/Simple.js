import React, { Component } from 'react';

import Tabs from '../index';
import { Icon } from 'react-eva';

export default class Simple extends Component {
  renderBasketball() {
    return (
      <div className="basketball">
        When found, separator is removed from the string and the
        substrings are returned in an array. If separator is not
        found or is omitted, the array contains one element consisting
        of the entire string. If separator is an empty string,
        str is converted to an array of characters.
        If separator is a regular expression that contains capturing
        parentheses, then each time separator is matched, the results
        (including any undefined results) of the capturing parentheses
        are spliced into the output array. However, not all browsers
        support this capability.
      </div>
    );
  }

  renderFootball() {
    return (
      <div className="football">
        From football;
      </div>
    );
  }

  renderPingPong() {
    return (
      <div className="ping-pong">
        From ping pong;
      </div>
    );
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
      disabled: true,
    }];

    const style = {
      tabTitle: {
        width: '200px',
      },
    };

    return (
      <Tabs style={style}>
        {
          tabs.map((tab, key) => {
            return (
              <Tabs.Item key={key}>
                <Tabs.TabTitle disabled={tab.disabled} active={tab.active}>
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
    );
  }
}
