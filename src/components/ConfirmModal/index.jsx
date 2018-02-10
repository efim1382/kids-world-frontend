import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { Button, Modal } from 'components';
import { hideConfirmModal } from './actions';
import styles from './style.css';

export reducers from './reducers';

const ConfirmModal = ({
  question, handleApprove, handleCancel, show,
}) => <Portal>
  <Modal
    title="Подтверждение действия"
    show={show}
    className={styles.confirmModal}
    handleClose={handleCancel}
    wrapperClass={styles.wrapper}
  >
    <p className={styles.text}>{ question }</p>

    <div className={styles.actions}>
      <Button appearance="danger" caption="Да" onClick={handleApprove} className={styles.button} />
      <Button appearance="primary" caption="Нет" onClick={handleCancel} className={styles.button} />
    </div>
  </Modal>
</Portal>;

ConfirmModal.propTypes = {
  question: PropTypes.string.isRequired,
  handleApprove: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    show: _.get(state, 'confirmModal.isShown', false),
    question: _.get(state, 'confirmModal.question', ''),
    handleApprove: _.get(state, 'confirmModal.handleApprove', () => {}),
  }),

  {
    handleCancel: hideConfirmModal,
  },
)(ConfirmModal);
