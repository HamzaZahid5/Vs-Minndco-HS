import React from "react";
import { View, Text } from "react-native";
import { Modal } from 'react-native-paper';
import Dialog from "../../components/DefaultDialog";

export default ({ navigation }) => (
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