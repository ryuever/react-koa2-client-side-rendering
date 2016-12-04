import React, { Component } from 'react';
import Card from '../components/card';
import Profile from '../components/profile';

export default class Questionnaire extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ng-questionnaire">
        <Profile />
      </div>
    )
  }
}

// export default class Questionnaire extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div className="ng-questionnaire">
//       tei
//       </div>
//     )
//   }
// }
