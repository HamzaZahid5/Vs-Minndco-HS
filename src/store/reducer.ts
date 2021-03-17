import { combineReducers } from 'redux';
import flagger from './slices/flags';

const reducer = combineReducers({
  flags: flagger.reducer,
});

export default reducer;