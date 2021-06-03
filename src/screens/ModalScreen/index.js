import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Modal } from 'react-native-paper';
import Dialog from '../../components/DefaultDialog';

const ModalScreen = ({ navigation }) => (
  <Dialog
    show
    onClose={() => navigation.pop()}
    onButtonPress={() => navigation.pop()}
    icon="calendar"
    title="HolKeAse"
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
