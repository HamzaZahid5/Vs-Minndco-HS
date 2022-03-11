import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Paragraph, Row, Subheading, useRobTheme } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import { HeroIconType } from './Program'
import { translate } from '../../utils/localization'
import useProgressTrend, { TRENDS } from '../../utils/hooks/useProgressTrend'
import useTodaysActivityDone from '../../utils/hooks/useTodaysActivityDone'

const useIconProgres = (): HeroIconType => {
  // TOOLS
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const theme = useRobTheme()

  // HELPERS
  const progressTrend = useProgressTrend()
  const todayActivityDone = useTodaysActivityDone()

  return {
    icon: 'Calendar',
    label: translate('screens.Program.progress'),
    value:
      progressTrend === TRENDS.EMPTY
        ? ' '
        : progressTrend === TRENDS.FULL
        ? translate('screens.Program.progress_full', { defaultValue: 'Completo' })
        : progressTrend === TRENDS.GOOD
        ? translate('screens.Program.progress_good', { defaultValue: 'Good' })
        : progressTrend === TRENDS.FINE
        ? translate('screens.Program.progress_fine', { defaultValue: 'Fine' })
        : translate('screens.Program.progress_slow', { defaultValue: 'Slow' }),
    valueColor:
      progressTrend === TRENDS.FULL
        ? theme.colors.success.darkmode
        : progressTrend === TRENDS.GOOD
        ? theme.colors.success.darkmode
        : progressTrend === TRENDS.FINE
        ? theme.colors.warning.darkmode
        : theme.colors.danger.darkmode,
    onPress: () => {
      navigation.navigate('BasicModal', {
        content: ({ close }) => (
          <>
            <Row margin={50}>
              <Subheading>{translate('screens.Program.progress_info_title')}</Subheading>
              <Paragraph size="small" weight="normal">
                {progressTrend === TRENDS.EMPTY
                  ? translate('screens.Program.progress_info_desc_blank')
                  : progressTrend === TRENDS.FULL
                  ? translate('screens.Program.progress_info_desc_full')
                  : progressTrend === TRENDS.GOOD
                  ? translate('screens.Program.progress_info_desc_good')
                  : progressTrend === TRENDS.FINE
                  ? translate('screens.Program.progress_info_desc_fine')
                  : translate('screens.Program.progress_info_desc_slow')}
              </Paragraph>
            </Row>
            <Row margin={50}>
              <Button round compact onPress={close}>
                {translate('commons.messages.close')}
              </Button>
              {!todayActivityDone && (
                <Button
                  light
                  compact
                  onPress={async () => {
                    await close()
                    navigation.navigate('Activity')
                  }}
                >
                  {translate('screens.Program.progress_CTA_label', { defaultValue: "Go for today's activity" })}
                </Button>
              )}
            </Row>
          </>
        ),
      })
    },
  }
}

export default useIconProgres
