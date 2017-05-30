import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// eslint много ругается на этот код. Ее забыть узнать что тут не так
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
    /* eslint-disable */
    const domNode = ReactDOM.findDOMNode(this);
    const { composedComponent } = this.refs;
    /* eslint-enable */

    if (!domNode || !domNode.contains(event.target)) {
      composedComponent.togglePopup();
    }
  }

  render() {
    return (
      <ComposedComponent
        /* eslint-disable */
        ref="composedComponent"
        /* eslint-enable */
        {...this.props}
      />
    );
  }
};
