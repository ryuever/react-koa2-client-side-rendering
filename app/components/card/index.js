import React, { Component } from 'react';
import { Radio } from 'react-eva';

// export default class Card extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div className="questionanaire-card">
//         <div className="questionanaire-content">
//           哪种生活习惯是你比较喜欢的
//         </div>
//       </div>
//     )
//   }
// }

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="questionanaire-card">
        <div className="questionanaire-content">
          哪种生活习惯是你比较喜欢的
        </div>
        <div className="questionanaire-options">
          <Radio.Group>
            <Radio value="Male">male</Radio>
            <Radio value="Female">female</Radio>
          </Radio.Group>
        </div>
      </div>
    )
  }
}