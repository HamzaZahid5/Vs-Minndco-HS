import React, { useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Subheading, Row, Paragraph, Button } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { MISSING_JOURNAL_WARNING_SHOWN, SMOKE_RECORD, USER_PROFILE } from '../../store/selectors'
import { translate } from '../localization'
import { RootStackParamList } from '../../../types'

const MakePopupContent = (navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>) => {
  const PopupContent = ({ close }: { close: () => Promise<void> }) => {
    return (
      <>
        <Row gutter={10}>
          <Subheading>{translate('screens.missingJournalPopUp.title')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="medium" weight="normal" textAlign="left">
            {translate('screens.missingJournalPopUp.message')}
          </Paragraph>
        </Row>
        <Row gutter={10} grow justifyContentOnGrow="flex-end">
          <Button
            role="primary"
            compact
            onPress={async () => {
              await close()
              navigation.navigate('SmokeModal')
            }}
          >
            {translate('screens.missingJournalPopUp.confirmButtonLabel')}
          </Button>
        </Row>
      </>
    )
  }
  return PopupContent
}

const useSmokeAlertPopup = (navigation: StackNavigationProp<RootStackParamList>) => {
  const dispatch = useDispatch()
  const smoke_record = useSelector(SMOKE_RECORD)
  const { created_at } = useSelector(USER_PROFILE)
  const missingJournalWarningShown = useSelector(MISSING_JOURNAL_WARNING_SHOWN)

  const yesterday = moment().subtract(1, 'd').format('YYYY-MM-DD')
  const today = moment() as unknown as PropertyKey

  const hasTodayEntry = smoke_record && smoke_record.hasOwnProperty(today)
  const hasYesterdayEntry = smoke_record && smoke_record.hasOwnProperty(yesterday)
  const hasEntryAtAll = smoke_record && Object.keys(smoke_record).length
  const moreThan24HsFromRegistration = created_at && moment().diff(moment(created_at.toDate()), 'h') > 24

  useEffect(() => {
    if (
      hasEntryAtAll &&
      !hasTodayEntry &&
      !hasYesterdayEntry &&
      !missingJournalWarningShown &&
      moreThan24HsFromRegistration
    ) {
      navigation.navigate('BasicModal', {
        content: MakePopupContent(navigation),
      })
      dispatch({ type: 'user/setMissingJournalWarningShown', payload: true })
    }
  }, [
    navigation,
    dispatch,
    hasEntryAtAll,
    hasTodayEntry,
    hasYesterdayEntry,
    missingJournalWarningShown,
    moreThan24HsFromRegistration,
  ])
}

export default useSmokeAlertPopup
