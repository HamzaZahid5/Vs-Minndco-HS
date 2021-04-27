import React, {useEffect, useRef, useState, forwardRef} from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import SnapCarousel, { Pagination } from 'react-native-snap-carousel';

const renderItem = ({item, index}) => {
  return (
    <View style={styles.slide}>
      { item.title && <Text style={styles.text}>{ item.title }</Text> }
      { item.content }
    </View>
  );
}

export const nextSlide = (ref) => {
  ref.current.snapToItem(ref.current.currentIndex + 1, true)
}

export const prevSlide = (ref) => {
  ref.current.snapToItem(ref.current.currentIndex - 1, true)
}

export default forwardRef(({ items }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <SnapCarousel
        ref={ref}
        layout={'default'}
        data={items}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onLayout={() => ref.current.snapToItem(currentIndex, true)}
        onSnapToItem={index => setCurrentIndex(index)}
      />
      <Pagination
        dotsLength={items.length}
        activeDotIndex={currentIndex}
        containerStyle={{
          // backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          // backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  );
});

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '100%',
    flex: 1,
    flexGrow: 1,
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // height: '100%',
    // maxHeight: '100%',
    borderWidth: 0, borderColor: 'red',
  },
  slideText: {
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
  },
});

// export default {
//   Carousel: _carousel,
//   nextSlide,
//   prevSlide,
// };
