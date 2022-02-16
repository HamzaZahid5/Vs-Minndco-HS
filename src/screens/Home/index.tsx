import React from 'react'
import { View, StatusBar } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import {
  TabbedScreen,
  Row,
  Carousel,
  Icon,
  Paragraph,
  Button,
  Text,
  Billboard,
  useRobTheme,
  BackgroundArt,
} from '@mindcoxr/rob'
import { homeBGColors } from '../../utils/config'

const HomeScreen = () => {
  const theme = useRobTheme()
  return (
    <TabbedScreen colors={homeBGColors}>
      <StatusBar
        animated={true}
        // backgroundColor="#61dafb"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden
      />
      <BackgroundArt paddingTop={5} colors={homeBGColors} source={require('../../../assets/images/bg_01.png')} />
      {/* top spacer */}
      <Row />
      {/* menu button row */}
      <Row margin={20}>{/* <MenuButton /> */}</Row>

      <Row grow margin={0}>
        <Carousel
          dotConfig={{
            justify: 'flex-end',
          }}
        >
          <View style={{ width: '100%', alignItems: 'flex-start', padding: 24 }}>
            <Row margin={0}>
              <Text light>Todasy's activity</Text>
            </Row>
            <Row margin={0}>
              <Billboard textAlign="left" light>
                Recognizing the external triggers
              </Billboard>
            </Row>
            <Row margin={0}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Icon
                  name="VR"
                  color={theme.colors.onSurface}
                  wrapperStyle={{
                    marginRight: 10,
                  }}
                />
                <Paragraph size="medium" light weight="normal">
                  VR lesson, 10 min
                </Paragraph>
              </View>
            </Row>
            <Row margin={0}>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  compact
                  onPress={() => {
                    alert('start onboarding')
                  }}
                >
                  Begin activity
                </Button>
              </View>
            </Row>
          </View>

          <View style={{ width: '100%', alignItems: 'flex-start', padding: 24 }}>
            <Row margin={0}>
              <Icon name="Paste" size={60} color={theme.colors.monochrome.offWhite} strokeWidth={1} />
            </Row>
            <TouchableRipple onPress={() => alert('go!')} rippleColor="transparent">
              <>
                <Row margin={0}>
                  <Billboard textAlign="left" light>
                    Check your progress and savings
                  </Billboard>
                </Row>
                <Row margin={0}>
                  <Paragraph size="medium" light weight="normal" textAlign="left">
                    Visit your overview
                  </Paragraph>
                </Row>
              </>
            </TouchableRipple>
          </View>
        </Carousel>
      </Row>
    </TabbedScreen>
  )
}

export default HomeScreen
