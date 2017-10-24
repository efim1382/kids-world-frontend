import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FontIcon from 'material-ui/FontIcon';

const Icon = ({
  name,
  className,
  color,
}) => <FontIcon
  className={classNames('material-icons', className)}
  color={color}
>{ name }</FontIcon>;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default Icon;
