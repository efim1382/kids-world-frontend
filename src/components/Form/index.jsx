import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.css';

const Form = ({
  children,
  className,
}) => <form
  method="post"
  className={classNames(styles.form, className)}
>
  { children }
</form>;

Form.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Form;
