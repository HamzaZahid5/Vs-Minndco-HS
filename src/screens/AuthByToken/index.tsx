import { BasicScreen, Button, Row } from '@mindcoxr/rob'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Paragraph } from 'react-native-paper'
import Blob from '../../../assets/SVG/Blob'
import Logo from '../../../assets/SVG/Logo'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import auth from '../../services/Auth/auth'

const AuthByToken = ({
  navigation,
  route,
}: DefaultScreenPropType<'AuthByToken'> & DefaultScreenRouteType<'AuthByToken'>) => {
  const token = route.params?.token
  const [state, setState] = useState<string>('BUSY')

  const startAuthProcess = async () => {
    try {
      await auth().signOut()
    } catch (e) {
      e
    }

    try {
      // eslint-disable-next-line no-console
      console.log(token)
      const credentials = await auth().signInWithCustomToken(token)
      // eslint-disable-next-line no-console
      console.log(credentials)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      setState('ERROR')
    }
  }
  useEffect(() => {
    if (token) {
      startAuthProcess()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <BasicScreen>
      <Blob style={{ position: 'absolute', top: '16%', right: 0 }} />
      <Row>
        <Logo />
      </Row>
      {!token && (
        <>
          <Row grow>
            <SomethingWentWrong />
          </Row>
          <Row>
            <Button onPress={() => navigation.navigate('Login')}>Sign In</Button>
            <Button onPress={() => navigation.navigate('Landing')} role="secondary">
              back
            </Button>
          </Row>
        </>
      )}
      {state === 'ERROR' && (
        <>
          <Row grow justifyContentOnGrow="center">
            <CanNotAuthWithToken />
          </Row>
          <Row>
            <Button onPress={() => navigation.navigate('Login')}>Sign In</Button>
            <Button onPress={() => navigation.navigate('Landing')} role="secondary">
              back
            </Button>
          </Row>
        </>
      )}
      {state === 'BUSY' && (
        <>
          <ActivityIndicator />
        </>
      )}
    </BasicScreen>
  )
}

const SomethingWentWrong = () => <Paragraph>Something went wrong. Please, continue with sign in</Paragraph>
const CanNotAuthWithToken = () => (
  <Paragraph>The link used is not valid anymore. Please, continue with sign in</Paragraph>
)
export default AuthByToken
