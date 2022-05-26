import React, { useEffect } from 'react'
import { Headline, Paragraph, Button, Row, BasicScreen as Screen } from '@mindcoxr/rob'
import { DefaultScreenPropType } from '../../../types'
import { translate } from '../../utils/localization'

const OnboardingWelcomeScreen = ({ navigation }: DefaultScreenPropType<'KitActivation'>) => {
  return (
    <Screen ignoreTopSafeArea color="500">
      <Row grow justifyContentOnGrow="flex-end" gutter={32}>
        <Headline size="huge" weight="bold" light>
          {translate('screens.KitActivationLanding.title')}{' '}
        </Headline>
        <Paragraph size="small" weight="normal" light>
          {translate('screens.KitActivationLanding.description')}
        </Paragraph>
      </Row>
      <Row gutter={75} />
      <Row gutter={25}>
        <Button
          role="primary"
          light
          onPress={() => {
            navigation.navigate('KitActivation')
          }}
        >
          {translate('screens.KitActivationLanding.confirm')}
        </Button>
        <Button
          light
          role="secondary"
          onPress={() => {
            navigation.popToTop()
          }}
        >
          {translate('screens.KitActivationLanding.cancel')}
        </Button>
      </Row>
      <Row gutter={60} />
    </Screen>
  )
}

export default OnboardingWelcomeScreen
