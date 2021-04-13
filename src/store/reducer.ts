import { combineReducers } from 'redux';
import flagger, { FlagsState } from './slices/flags';
import user, { UserState } from './slices/user';
import teacher, { TutorialsState } from './slices/tutorials';

export type RootState = {
  flags: FlagsState;
  user: UserState;
  tutorials: TutorialsState;
}

const reducer = combineReducers({
  flags: flagger.reducer,
  user: user.reducer,
  tutorials: teacher.reducer,
});

export default reducer;