import { combineReducers } from 'redux';
import flagger, { FlagsState } from './slices/flags';
import user, { UserState } from './slices/user';
import teacher, { TutorialsState } from './slices/tutorials';
import stressOMeter, { StressInputState } from './slices/currentStressInput';

export type RootState = {
  flags: FlagsState;
  user: UserState;
  tutorials: TutorialsState;
  currentStressInput: StressInputState;
}

const reducer = combineReducers({
  flags: flagger.reducer,
  user: user.reducer,
  tutorials: teacher.reducer,
  currentStressInput: stressOMeter.reducer,
});

export default reducer;