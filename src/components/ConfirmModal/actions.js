import { SHOW_CONFIRMATION, HIDE_CONFIRMATION } from './constants';

export const showConfirmModal = data => (dispatch) => {
  dispatch({
    type: SHOW_CONFIRMATION,
    question: data.question,
    handleApprove: data.handleApprove,
  });
};

export const hideConfirmModal = () => (dispatch) => {
  dispatch({
    type: HIDE_CONFIRMATION,
  });
};
