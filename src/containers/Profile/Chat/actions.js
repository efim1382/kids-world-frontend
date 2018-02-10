// eslint-disable-next-line
export const filterChats = text => (dispatch) => {
  dispatch({
    type: 'FILTER_CHATS',
    text,
  });
};
