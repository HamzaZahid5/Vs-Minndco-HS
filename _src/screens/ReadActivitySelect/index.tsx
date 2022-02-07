import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
import { ContentTypesType, DefaultScreenPropType, LifesaverContentType } from '../../../types';
import { translate } from '../../utils/localization';
// @ts-ignore: non-ts file
import { getReadsByContentCategory } from '../../utils/constants';
import { Headline, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

type ReadContentType = LifesaverContentType & { title: string };

const ReadActivitySelect = ({ navigation }: DefaultScreenPropType<'StressActivityType'>) => {
  const [readContent, setReadContent] = useState<Record<string, ReadContentType[]>>({});
  useEffect(() => {
    const content = getReadsByContentCategory() as Record<string, ReadContentType[]>;
    setReadContent(content);
  }, []);
  return (
    <ScreenDecorator>
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', padding: 20 }}>
          {Object.keys(readContent).map((contentCategory, i) => (
            <View key={contentCategory}>
              <Headline style={{ marginHorizontal: 10, marginBottom: 3, marginTop: i === 0 ? 0 : 20 }}>
                {translate('screens.ReadActivitySelect.' + contentCategory)}
              </Headline>
              {readContent[contentCategory].map(content => (
                <View key={content.id} style={{ marginVertical: 5 }}>
                  <RowItem
                    title={content.title}
                    text={''}
                    onPress={() =>
                      navigation.navigate('StressActivityToDo', {
                        isFromPlayground: true,
                        selectedContent: { ...content },
                        type: 'READ',
                      })
                    }
                    testID={`select-read-${content.id}`}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenDecorator>
  );
};

export default ReadActivitySelect;
