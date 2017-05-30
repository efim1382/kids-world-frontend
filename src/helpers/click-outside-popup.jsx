import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Плохой способ для закрытия попапа. Придумать лучше
export default ComposedComponent => class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
    const { composedComponent } = this.refs; // eslint-disable-line react/no-string-refs

    if (composedComponent.state.showed && (!domNode || !domNode.contains(event.target))) {
      composedComponent.closePopup();
    }
  }

  render() {
    return (
      <ComposedComponent
        ref="composedComponent" // eslint-disable-line react/no-string-refs
        {...this.props}
      />
    );
  }
};
