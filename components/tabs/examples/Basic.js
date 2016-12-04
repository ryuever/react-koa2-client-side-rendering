import React, { Component } from 'react';

import Tabs  from '../index';
import { Icon } from 'react-eva';

export default class Basic extends Component {
  render() {
    return (
      <Tabs hoverable hoverTime={1000}>
        <Tabs.Item>
          <Tabs.TabTitle>
            <Icon name="basketball" />
            篮球
          </Tabs.TabTitle>
          <Tabs.TabPanel>
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
          </Tabs.TabPanel>
        </Tabs.Item>
        <Tabs.Item>
          <Tabs.TabTitle active>
            <Icon name="football" />
            足球
          </Tabs.TabTitle>
          <Tabs.TabPanel>
            <div className="football">
              可愛ね〜〜〜
            </div>
          </Tabs.TabPanel>
        </Tabs.Item>
        <Tabs.Item>
          <Tabs.TabTitle>
            <Icon name="ping-pong" />
            乒乓
          </Tabs.TabTitle>
          <Tabs.TabPanel>
            <div className="ping-pong">
              You are so cute :)
            </div>
          </Tabs.TabPanel>
        </Tabs.Item>
      </Tabs>
    );
  }
}
