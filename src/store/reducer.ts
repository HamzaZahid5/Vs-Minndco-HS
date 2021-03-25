import { combineReducers } from 'redux';
import flagger, { FlagsState } from './slices/flags';
// @ts-ignore
import user from './slices/user';

export type RootState = {
  flags: FlagsState;
  user: any;
}

const reducer = combineReducers({
  flags: flagger.reducer,
  user: user.reducer,
});

export default reducer;