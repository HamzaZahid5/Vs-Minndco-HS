import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import reducer from './reducer';

const env = { name: 'development'};

const logger: Middleware<{}>
 = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export default function configureStore(initialState = {}) {
  const localStore = createStore(
    reducer,
    initialState,
    env.name === 'development' || true
      ? composeWithDevTools(applyMiddleware(thunk, logger))
      : applyMiddleware(thunk),
  );
  
  return localStore;
}