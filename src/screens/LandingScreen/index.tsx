import React from 'react'
import { View, StatusBar } from 'react-native'
import { BasicScreen, Row, Carousel, Headline, Paragraph, Button, Text, Link } from '@mindcoxr/rob'
import MindcotineLogo from '../../../assets/SVG/MindcotineLogo'
import Blob from '../../../assets/SVG/Blob'

const LandingScreen = () => {
  return (
    <BasicScreen>
      <StatusBar
        animated={true}
        // backgroundColor="#61dafb"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden />
      <Blob style={{ position: 'absolute', top: '16%', right: 0 }} />
      <Row>
        <MindcotineLogo style={{}} />
      </Row>
      <Row grow>
        <Carousel>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{}}>
              <Headline size="huge" weight="bold">
                Train to quit smoking
              </Headline>
            </View>
            <View style={{ marginTop: 8 }}>
              <Paragraph size="small" weight="normal">
                Easy-to-follow excercises combining Virtual Reality, coaching and more
              </Paragraph>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{}}>
              <Headline size="huge" weight="bold">
                A program 4x more effective
              </Headline>
            </View>
            <View style={{ marginTop: 8 }}>
              <Paragraph size="small" weight="normal">
                Train yourself in virtual environments to get control over your cravings
              </Paragraph>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{}}>
              <Headline size="huge" weight="bold">
                A 6-week planto quit
              </Headline>
            </View>
            <View style={{ marginTop: 8 }}>
              <Paragraph size="small" weight="normal">
                At vero eos et accusamus et iusto dignissimos ducimu
              </Paragraph>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{}}>
              <Headline size="huge" weight="bold">
                Also includes a follow up plan
              </Headline>
            </View>
            <View style={{ marginTop: 8 }}>
              <Paragraph size="small" weight="normal">
                Once you quit, we’ll help you maintain your progress
              </Paragraph>
            </View>
          </View>
        </Carousel>
      </Row>
      <Row>
        <Button role="primary" onPress={() => alert('Register screen')}>
          Get started
        </Button>
      </Row>
      <Row>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text weight="regular">
            Already have an account?{' '}
            <Link onPress={() => alert('Screens')} href="">
              Sign in
            </Link>
          </Text>
        </View>
      </Row>
    </BasicScreen>
  )
}
export default LandingScreen
