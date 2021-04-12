import { combineReducers } from 'redux';
import flagger, { FlagsState } from './slices/flags';
// @ts-ignore
import user, { UserState } from './slices/user';

export type RootState = {
  flags: FlagsState;
  user: UserState;
}

const reducer = combineReducers({
  flags: flagger.reducer,
  user: user.reducer,
});

export default reducer;