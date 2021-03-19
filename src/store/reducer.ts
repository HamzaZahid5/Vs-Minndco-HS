import { combineReducers } from 'redux';
import flagger, { FlagsState } from './slices/flags';

export type RootState = {
  flags: FlagsState;
}

const reducer = combineReducers({
  flags: flagger.reducer,
});

export default reducer;