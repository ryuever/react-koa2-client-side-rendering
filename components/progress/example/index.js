import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Progress from '../index';
import './styles.css';
import 'wall-e';

class ProgressExam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: 0,
      exception: false,
    };
  }

  componentDidMount() {
    this.progress = setInterval(
      this.generateProgress.bind(this), 50);
  }

  generateProgress() {
    const percent = this.state.percent + 1;
    if (percent === 100) {
      clearInterval(this.progress);
    }
    this.setState({ percent });
  }

  render() {
    const { percent } = this.state;

    return (
      <div className="container">
        <ul className="row">
          <li className="col-2">
            <Progress.Bar
              percent={percent}
              size="xs" />
          </li>

          <li className="col-4">
            <Progress.Bar
              percent={percent}
              size="sm" />
          </li>

          <li className="col-6">
            <Progress.Bar
              percent={percent} />
          </li>

          <li className="col-12">
            <Progress.Bar
              percent={percent}
              size="lg" />
          </li>

          <li className="col-6">
            <Progress.Bar
              percent={percent}
              exception />
          </li>

          <li className="col-6">
            <Progress.Bar
              percent={10}>
              <span>
                <strong>3</strong>
                <span style={{ color: '#bdbdbd' }}>/30</span>
              </span>
            </Progress.Bar>
          </li>
        </ul>

        <ul className="row">
          <li className="col-1">
            <Progress.Circle
              percent={percent}
              size="xs" />
          </li>

          <li className="col-2">
            <Progress.Circle
              percent={percent}
              size="sm" />
          </li>

          <li className="col-3">
            <Progress.Circle
              percent={percent} />
          </li>

          <li className="col-4">
            <Progress.Circle
              percent={percent}
              size="lg" />
          </li>

          <li className="col-3">
            <Progress.Circle
              percent={percent}
              exception />
          </li>

          <li className="col-6">
            <Progress.Circle
              percent={25}>
              <span>
                <strong>60</strong>
                <span style={{
                  color: '#bdbdbd',
                  fontSize: '1.6rem',
                }}>/240</span>
              </span>
            </Progress.Circle>
          </li>
        </ul>
      </div>
    );
  }
}

const container = document.querySelector('#app');
ReactDom.render(<ProgressExam />, container);
