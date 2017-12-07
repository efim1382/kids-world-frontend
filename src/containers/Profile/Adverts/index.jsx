import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import styles from './style.css';

const Adverts = () => <div className={styles.adverts}>
  <Link to="/">
    <RaisedButton label="Подать объявление" primary />
  </Link>

  <ul className={styles.list}>
    <li className={styles.advert}>
      <div className={styles.image} style={{ '--image': 'url("/images/ad-image.jpg")' }} />

      <div className={styles.tooltip}>
        <h4>Детские кроссовки</h4>

        <Link to="/">
          <FlatButton label="Редактировать" />
        </Link>
      </div>
    </li>
  </ul>
</div>;

export default Adverts;
