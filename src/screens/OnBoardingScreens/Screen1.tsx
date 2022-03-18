import React from 'react'
import {
  BasicScreen,
  Row,
  Carousel,
  Headline,
  Paragraph,
  Button,
  Text,
  Billboard,
  useRobTheme,
  BackgroundArt,
} from '@mindcoxr/rob'
import { DefaultScreenPropType } from './index'
import { useSelector } from 'react-redux'
import { USER_SUPPORT_PROFILE } from '../../store/selectors'
import { translate } from '../../utils/localization'

const OnboardingWelcomeScreen = ({ navigation, onNext }: DefaultScreenPropType<'Screen1'>) => {
  const { display_name } = useSelector(USER_SUPPORT_PROFILE)
  return (
    <BasicScreen color="600">
      <Row grow />
      <Row>
        <Headline size="huge" weight="bold" light>
          👋 {display_name}! {translate('screens.onboardingStart.title')}
        </Headline>
      </Row>
      <Row>
        <Paragraph size="small" weight="normal" light>
          {translate('screens.onboardingStart.description')}
        </Paragraph>
      </Row>
      <Row>
        <Button
          light
          onPress={() => {
            onNext(navigation)
          }}
        >
          {translate('screens.onboardingStart.button')}
        </Button>
      </Row>
    </BasicScreen>
  )
}

export default OnboardingWelcomeScreen
