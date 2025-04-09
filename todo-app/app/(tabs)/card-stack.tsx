import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const SYMBOLS = ["♠", "♥", "♦", "♣"];
const SCREEN_WIDTH = Dimensions.get("window").width;

type ContextType = {
  startX: number;
  startY: number;
};

function CardStack() {
  const [cards, setCards] = useState(SYMBOLS);

  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, ctx) => {
      ctx.startX = offsetX.value;
      ctx.startY = offsetY.value;
    },
    onActive: (event, ctx) => {
      offsetX.value = ctx.startX + event.translationX;
      offsetY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const velocity = Math.abs(event.velocityX) + Math.abs(event.velocityY);

      if (velocity > 800 || Math.abs(offsetX.value) > SCREEN_WIDTH / 3) {
        offsetX.value = withTiming(
          event.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { duration: 300 },
          () => {
            runOnJS(removeAndCycleCard)();
            offsetX.value = 0;
            offsetY.value = 0;
          }
        );
      } else {
        offsetX.value = withSpring(0);
        offsetY.value = withSpring(0);
      }
    },
  });

  const removeAndCycleCard = () => {
    const first = cards[0];
    setCards((prev) => [...prev.slice(1), first]);
  };

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { rotate: `${offsetX.value / 20}deg` },
    ],
  }));

  return (
    <View style={styles.container}>
      {cards
        .slice(0)
        .reverse()
        .map((symbol, index, arr) => {
          const isTop = index === arr.length - 1;

          const zIndex = isTop ? 10 : index;
          const scale = isTop ? 1 : 0.95 + index * 0.02;
          const translateY = isTop ? 0 : index * 3;

          return (
            <PanGestureHandler
              key={symbol}
              enabled={isTop}
              onGestureEvent={gestureHandler}
            >
              <Animated.View
                style={[
                  styles.card,
                  {
                    zIndex,
                    transform: [{ scale }, { translateY }],
                  },
                  isTop && cardStyle,
                ]}
              >
                <Text style={styles.symbol}>{symbol}</Text>
              </Animated.View>
            </PanGestureHandler>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b52e35", // червоне тло
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: 200,
    height: 300,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  symbol: {
    fontSize: 60,
  },
});

// ✅ Оце і є export default для expo-router
export default function CardStackScreen() {
  return <CardStack />;
}
