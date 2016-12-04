import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header';
import Footer from './Footer';

// export default class App extends Component {
//   render() {
//     const { children } = this.props;

//     return (
//       <div className="ng-app">
//       </div>
//     );
//   }
// }

export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="ng-app">
        <Header />
        <div className="ng-main">
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}
