import { Component } from 'react';
import ReactDOM from 'react-dom';

export default class RenderIntoContainerWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
    };
  }

  componentDidMount() {
    this.renderLayer();
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.removeNode();
  }

  removeNode() {
    if (this.node) {
      ReactDOM.unmountComponentAtNode(this.node);
      this.node.parentNode.removeChild(this.node);
      this.node = null;
    }
  }

  renderLayer() {
    const { visible } = this.state;
    const { parentComponent, appendedElement } = this.props;

    if (visible || this.node) {
      if (!this.node) {
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
      }
      ReactDOM.unstable_renderSubtreeIntoContainer(
        parentComponent, appendedElement, this.node
      );
    }
  }

  render() {
    return null;
  }
}

RenderIntoContainerWrapper.defaultProps = {
  visible: false,
};
