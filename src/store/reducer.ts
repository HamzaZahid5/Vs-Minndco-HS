import { combineReducers } from 'redux'
import flagger, { FlagsState } from './slices/flags'
import user, { UserState } from './slices/user'
import teacher, { TutorialsState } from './slices/tutorials'
import stressOMeter, { StressInputState } from './slices/currentStressInput'
import currentOnboarding, { OnboardingInputState } from './slices/onboardingInput'

export type RootState = {
  flags: FlagsState
  user: UserState
  tutorials: TutorialsState
  currentStressInput: StressInputState
  currentOnboarding: OnboardingInputState
}

const reducer = combineReducers({
  flags: flagger.reducer,
  user: user.reducer,
  tutorials: teacher.reducer,
  currentStressInput: stressOMeter.reducer,
  currentOnboarding: currentOnboarding.reducer,
})

export default reducer
