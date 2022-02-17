import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Row, Icon, BasicScreen as Screen, useRobTheme, Button, PopupWrapper, Subheading } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableRipple, Paragraph as PaperParagraph } from 'react-native-paper'
import moment from 'moment'
import { RootStackParamList } from '../../../types'
import WeekDaysBar from './WeekDaysBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SmokeRecordScreen = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
  const [isOpenForiOS, setIsOpenForiOS] = useState(false)
  const [show, setShow] = useState(false)
  const theme = useRobTheme()
  const [intake, setIntake] = useState(1)
  const [selected, setSelected] = useState(0)
  const insets = useSafeAreaInsets()
  const setIntakeSecureWrapper = (n: number) => {
    if (n >= 0) setIntake(n)
  }

  useEffect(() => {
    const unsubs = navigation.addListener('focus', () => {
      setTimeout(() => {
        setShow(true)
        setIsOpenForiOS(true)
      }, 100)
    })
    return () => unsubs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* container to hide panel on web */}
      <View style={{ flexGrow: 1, overflow: 'hidden' }}>
        <PopupWrapper noPaddingHorizontal show={show} onClose={() => navigation.pop()}>
          <Row gutter={45}>
            <WeekDaysBar selected={selected} onPress={i => setSelected(i)} />
            <Subheading numberOfLines={1}>
              {selected === 0 ? 'Today' : moment().add(selected, 'days').format('dddd')} I’ve smoked..
            </Subheading>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableRipple
                borderless
                style={{
                  height: 47,
                  width: 47,
                  borderRadius: 24,
                  backgroundColor: theme.colors.monochrome.input,
                  justifyContent: 'center',
                  marginRight: 27,
                  alignItems: 'center',
                }}
                onPress={() => setIntakeSecureWrapper(intake - 1)}
              >
                <Icon name="Minus" size={19} strokeWidth={4} color="black" />
              </TouchableRipple>
              <PaperParagraph
                style={{
                  ...theme.fonts.medium,
                  ...theme.fontSizes.display.large,
                  fontFamily: 'Poppins_600SemiBold',
                  fontWeight: '600',
                  color: theme.colors.text,
                }}
              >
                {intake}
              </PaperParagraph>
              <TouchableRipple
                borderless
                style={{
                  marginLeft: 27,
                  height: 47,
                  width: 47,
                  borderRadius: 24,
                  backgroundColor: theme.colors.monochrome.input,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setIntakeSecureWrapper(intake + 1)}
              >
                <Icon name="Plus" size={19} strokeWidth={4} color="black" />
              </TouchableRipple>
            </View>
          </Row>
          <Row gutter={20} grow justifyContentOnGrow="flex-end">
            <View style={{ marginHorizontal: 10 }}>
              <Button
                round
                onPress={() => {
                  setShow(false)
                }}
              >
                Save to my log
              </Button>
            </View>
          </Row>
          {/* padding bottom of the panel */}
          <View style={{ marginBottom: insets.bottom * 2 }} />
        </PopupWrapper>
      </View>
    </>
  )
}

export default SmokeRecordScreen
