import classNames from 'classnames';
import React from 'react';
import styles from './style.css';

const Button = (props: {
  type: string,
  caption?: string,
  className?: string,
}) => <button
  className={classNames(styles.button, props.className)}
  type={props.type}
>
  {props.caption && <span className={styles.caption}>{ props.caption }</span>}
</button>;

export default Button;
