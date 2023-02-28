import React, { useEffect, useState } from 'react'
import { reduce, filter } from 'lodash'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Subheading, Row, Paragraph, Button } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  PROGRESS,
  QUIT_DAY,
  SHOW_RELAPSE_WARNING,
  SMOKE_RECORD,
  TREATMENT_MODULE_AND_LEVEL,
} from '../../store/selectors'
import { translate } from '../localization'
import { RootStackParamList } from '../../../types'
import { calculateProgressForQuitDayRevert } from '../helpers'
import { revertQuitDay, updateRelapseWarningPopup } from '../../services/Firestore'

const MakePopupContent = (progress: string[], actualQuitDay: moment.Moment) => {
  const PopupContent = ({ close }: { close: () => Promise<void> }) => {
    const dispatch = useDispatch()
    return (
      <>
        <Row gutter={10}>
          <Subheading>{translate('screens.relapseWarningPopUp.title')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="medium" weight="normal" textAlign="left">
            {translate('screens.relapseWarningPopUp.message')}
          </Paragraph>
        </Row>
        <Row gutter={10} grow justifyContentOnGrow="flex-end">
          <Button
            role="primary"
            compact
            onPress={async () => {
              const [highestModule, highestLevelOnModule] = calculateProgressForQuitDayRevert(progress)
              revertQuitDay(actualQuitDay, highestModule, highestLevelOnModule)
              dispatch({ type: 'user/setShowRelapseWarinigPopup', payload: false })
              await close()
            }}
          >
            {translate('screens.relapseWarningPopUp.confirmButtonLabel')}
          </Button>
          <Button
            role="secondary"
            compact
            outline
            onPress={async () => {
              dispatch({ type: 'user/setShowRelapseWarinigPopup', payload: false })
              await close()
            }}
          >
            {translate('screens.relapseWarningPopUp.cancelButtonLabel')}
          </Button>
        </Row>
      </>
    )
  }
  return PopupContent
}

const useRelapseWarningPopup = (navigation: StackNavigationProp<RootStackParamList>) => {
  const dispatch = useDispatch()
  const [treatment_module, treatment_level] = useSelector(TREATMENT_MODULE_AND_LEVEL)
  const smoke_record = useSelector(SMOKE_RECORD)
  const showRelapseWarningPopup = useSelector(SHOW_RELAPSE_WARNING)
  const actualQuitDay = moment(useSelector(QUIT_DAY))
  const progress = useSelector(PROGRESS)

  // LETS CALCULATE IF USER CAN BE IN RELAPSE BASED ON JOURNAL INPUT.
  // MORE THAN 1 DAY SMOKING MORE THAN 1 CIGARETTE IN THE LAST WEEK WHILE IS IN ABSTINENCE
  const isAbstinence = treatment_module === 3
  // console.log({ isAbstinence })
  // console.log({ treatment_module })
  // console.log({ treatment_level })

  // @TODO: falta actualizar el momento en el que el usuario carga un nuevo record

  const sevenDaysAgo = moment().subtract(7, 'd')
  // days count with more than 1 cig this week
  const daysSmokedMoreThan1ThisWeek = reduce(
    filter(smoke_record, (_, date) => moment(date) > sevenDaysAgo),
    (r, i) => r + (i > 1 ? 1 : 0),
    0,
  )

  useEffect(() => {
    console.log({ isAbstinence })
    console.log({ daysSmokedMoreThan1ThisWeek })
    console.log({ showRelapseWarningPopup })
    if (isAbstinence && daysSmokedMoreThan1ThisWeek > 1 && showRelapseWarningPopup) {
      // condition to display relapse warning
      dispatch({ type: 'user/setShowRelapseWarinigPopup', payload: false })
      // firestore
      updateRelapseWarningPopup(false)
      navigation.navigate('BasicModal', {
        content: MakePopupContent(progress, actualQuitDay),
      })
    }
  }, [navigation, dispatch, showRelapseWarningPopup, isAbstinence, daysSmokedMoreThan1ThisWeek])
}

export default useRelapseWarningPopup
