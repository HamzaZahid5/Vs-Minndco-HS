import Color from 'color';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
import { ContentTypesType, DefaultScreenPropType } from '../../../types';
import { translate } from '../../utils/localization';
// @ts-ignore: non-ts file
import { LIFESAVER_ACTIVITIES } from '../../utils/constants';

const activities: string[] = LIFESAVER_ACTIVITIES.map((el: { id: string } & Record<string, unknown>) => el.id);
const defaultContent = {
  type: 'activity' as ContentTypesType,
  category: 'practical' as 'practical' | 'learning',
};

const StressActivitySelect = ({ navigation }: DefaultScreenPropType<'StressActivityType'>) => {
  return (
    <ScreenDecorator>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', padding: 20 }}>
        {activities.map(id => (
          <RowItem
            key={id}
            title={translate(`screens.StressActivitySelect.${id}-title`)}
            text={translate(`screens.StressActivitySelect.${id}-text`)}
            onPress={() =>
              navigation.navigate('StressActivityToDo', {
                isFromPlayground: true,
                selectedContent: { id, ...defaultContent },
              })
            }
            testID={`select-stress-${id}`}
          />
        ))}
      </View>
    </ScreenDecorator>
  );
};

export default StressActivitySelect;
