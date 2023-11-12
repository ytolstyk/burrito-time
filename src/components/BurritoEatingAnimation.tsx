import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSequence,
} from "react-native-reanimated";
import { useEffect } from "react";
import { BurritoImage } from "./BurritoEatingAnimation.styles";

export function BurritoEatingAnimation() {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSequence(
            withTiming(translateY.value, {
              duration: 1000,
              easing: Easing.bezier(0, 1.58, 0.82, 0.66),
            }),
            withTiming(-500, {
              duration: 200,
              easing: Easing.ease,
            })
          ),
        },
        {
          scale: withSequence(
            withTiming(scale.value, {
              duration: 1000,
              easing: Easing.bezier(0, 1.58, 0.82, 0.66),
            }),
            withTiming(5, {
              duration: 200,
              easing: Easing.ease,
            })
          ),
        },
      ],
      opacity: withSequence(
        withTiming(opacity.value, {
          duration: 500,
          easing: Easing.ease,
        }),
        withTiming(1, {
          duration: 500,
        }),
        withTiming(0, {
          duration: 200,
          easing: Easing.ease,
        })
      ),
    };
  });

  const animateIn = () => {
    translateY.value = -300;
    scale.value = 3;
    opacity.value = 1;
  };

  useEffect(() => {
    animateIn();
  }, []);

  return (
    <Animated.View
      style={{
        top: 0,
        left: 0,
        position: "absolute",
        backgroundColor: "transparent",
        height: 0,
        width: 0,
        ...animatedStyles,
      }}
    >
      <BurritoImage source={require("../../assets/logo.png")} />
    </Animated.View>
  );
}
