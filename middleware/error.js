import { messageSnackbar } from '../actions/global';

const defaultTypeSuffixes = ['REQUEST', 'SUCCESS', 'ERROR']

export default function loadingBarMiddleware(config = {}) {
  const typeSuffixes = config.typeSuffixes || defaultTypeSuffixes;

  return ({ dispatch }) => next => action => {
    next(action);

    if (action.type === undefined) {
      return;
    }

    const [PENDING, FULFILLED, REJECTED] = typeSuffixes;

    const isRejected = `_${REJECTED}`;

    if (action.type.indexOf(isRejected) !== -1) {
      const message = {
        type: REJECTED,
        content: action.error.toString()
      }
      if (action.error.indexOf('fetch') !== -1) {
        console.log(action.error);
      } else {
        alert(action.error);
      }
      // dispatch(messageSnackbar(message));
    }
  }
}