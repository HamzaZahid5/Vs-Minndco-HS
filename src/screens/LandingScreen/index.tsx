import React from 'react'
import { View, StatusBar } from 'react-native'
// @ts-ignore missing module declarations
import { BasicScreen, Row, Carousel, Headline, Paragraph, Button, Text, Link } from '@mindcoxr/rob'
import { translate } from '../../utils/localization'
import ProductLogo from '../../../assets/SVG/Logo'
import Blob from '../../../assets/SVG/Blob'

const LandingScreen = () => {
  return (
    <BasicScreen>
      <StatusBar
        animated={true}
        // backgroundColor="#61dafb"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden
      />
      <Blob style={{ position: 'absolute', top: '16%', right: 0 }} />
      <Row>
        <ProductLogo style={{}} />
      </Row>
      <Row grow>
        <Carousel>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{}}>
              <Headline size="huge" weight="bold">
                {translate('screens.Landing.slide1-title')}
              </Headline>
            </View>
            <View style={{ marginTop: 8 }}>
              <Paragraph size="small" weight="normal">
                {translate('screens.Landing.slide1-description')}
              </Paragraph>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{}}>
              <Headline size="huge" weight="bold">
                {translate('screens.Landing.slide2-title')}
              </Headline>
            </View>
            <View style={{ marginTop: 8 }}>
              <Paragraph size="small" weight="normal">
                {translate('screens.Landing.slide2-description')}
              </Paragraph>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{}}>
              <Headline size="huge" weight="bold">
                {translate('screens.Landing.slide3-title')}
              </Headline>
            </View>
            <View style={{ marginTop: 8 }}>
              <Paragraph size="small" weight="normal">
                {translate('screens.Landing.slide3-description')}
              </Paragraph>
            </View>
          </View>
        </Carousel>
      </Row>
      <Row>
        <Button role="primary" onPress={() => alert('Register screen')}>
          {translate('screens.Landing.sign-up-button-label')}
        </Button>
      </Row>
      <Row>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text weight="regular">
            {translate('screens.Landing.sign-in-offer-text')}{' '}
            <Link onPress={() => alert('Screens')} href="">
              {translate('screens.Landing.sign-in-link-text')}
            </Link>
          </Text>
        </View>
      </Row>
    </BasicScreen>
  )
}
export default LandingScreen
