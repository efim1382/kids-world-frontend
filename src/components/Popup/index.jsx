import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import styles from './style.css';

class Popup extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool.isRequired,
    parentComponent: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    handleClose: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    const { parentComponent } = this.props;
    const parentComponentToggle = parentComponent.handleTogglePopup;

    parentComponent.handleTogglePopup = () => {
      parentComponentToggle();
      document.removeEventListener('click', this.handleClickOutside);
    };
  }

  state = {
    shown: false,
  };

  componentDidMount() {
    this.isComponentMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    const { show } = nextProps;

    this.setState({
      shown: show,
    });
  }

  componentDidUpdate() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  handleClickOutside = (event) => {
    if (!this.isComponentMounted) {
      return;
    }

    event.stopPropagation();

    const { handleClose } = this.props;
    const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node

    if (this.state.shown && (!domNode || !domNode.contains(event.target))) {
      handleClose();
      document.removeEventListener('click', this.handleClickOutside);
    }
  };

  render() {
    const { children, className } = this.props;

    return <div
      className={classNames(
        styles.popup,
        className,
        this.state.shown ? '_shown' : '',
      )}
    >
      { children }
    </div>;
  }
}

export default Popup;
