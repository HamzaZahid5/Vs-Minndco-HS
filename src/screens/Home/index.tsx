import React from 'react'
import { View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
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
//@ts-ignore missing module declaration
import VR from '@mindcoxr/rob/dist/commonjs/SVG/VR'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const HomeScreen = () => {
  const theme = useRobTheme()
  return (
    <BasicScreen colors={['#79caf6', '#102c39']}>
      <BackgroundArt
        paddingTop={5}
        colors={['#79caf6', '#102c39']}
        source={require('../../../assets/images/bg_01.png')}
      />
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
                <VR
                  fillColor={theme.colors.onSurface}
                  style={{
                    justifyContent: 'center',
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
              <SimpleLineIcons name="notebook" size={40} color={theme.colors.monochrome.offWhite} />
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
    </BasicScreen>
  )
}

export default HomeScreen
