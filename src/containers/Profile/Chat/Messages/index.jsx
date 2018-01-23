import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

class Messages extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  handleDocumentKeyDown = (event) => {
    const { dispatch } = this.props;

    if (event.keyCode === 27) {
      dispatch(replace('/profile/chat'));
    }
  }

  render() {
    return <div>Messages</div>;
  }
}

export default connect()(Messages);
