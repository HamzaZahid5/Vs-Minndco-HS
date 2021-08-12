import React from 'react';
import PropTypes from 'prop-types';
// @ts-ignore: non-ts file
import Dialog from '../../components/DefaultDialog';
import { DefaultScreenPropType } from '../../../types';

const ModalScreen = ({ navigation }: DefaultScreenPropType<'Modal'>) => (
  <Dialog
    show
    onClose={() => navigation.pop()}
    onButtonPress={() => navigation.pop()}
    icon="calendar"
    title="HolaKeAse" //I think that this screen is not needed
    text="Testing modal messages."
    buttons={[
      {
        label: 'Okay',
      },
    ]}
  />
  // <Modal
  //   visible
  //   onDismiss={() => navigation.pop()}
  //   contentContainerStyle={{backgroundColor: 'white', padding: 20}}
  //   style={{ backgroundColor: 'transparent' }}
  // >
  //   <View><Text>da Modal</Text></View>
  // </Modal>
);

ModalScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ModalScreen;
