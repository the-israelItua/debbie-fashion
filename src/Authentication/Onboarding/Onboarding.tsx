import React from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Slide, { SLIDE_HEIGHT } from "../../components/Slide";
import {
  useValue,
  onScrollEvent,
  interpolateColor,
  event,
} from "react-native-redash/lib/module/v1";

const { width } = Dimensions.get("window");

const OnBoarding = () => {
  const x = new Animated.Value(0);
  const contentOffset = { x };
  const onScroll = {
    x,
    scrollHandler: {
      onScroll: event([
        {
          nativeEvent: {
            contentOffset,
          },
        },
      ]),
      scrollEventThrottle: 1,
    },
  };

  const backgroundColor = interpolateColor(x, {
    inputRange: [0, width, width * 2, width * 3],
    outputRange: ["#BEECC4", "#FFE4D9", "#BFEAF5", "#FFDDDD"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScrollEventThrottle={1}
          {...onScroll}
        >
          <Slide label="Relaxed" />
          <Slide label="Playful" right />
          <Slide label="Eccentric" />
          <Slide label="Funky" right />
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderTopLeftRadius: 75,
            }}
          ></View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    height: SLIDE_HEIGHT,
    backgroundColor: "cyan",
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
});

export default OnBoarding;
