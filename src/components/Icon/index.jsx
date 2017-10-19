import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FontIcon from 'material-ui/FontIcon';

const Icon = ({
  name,
  className,
}) => <FontIcon className={classNames('material-icons', className)}>{ name }</FontIcon>;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
