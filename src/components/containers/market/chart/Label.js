import React from "react";
import { Platform, StyleSheet } from "react-native";
import Animated, {
  concat,
  cond,
  divide,
  eq,
  floor,
  interpolateNode,
  lessThan,
  modulo,
  multiply,
  sub,
} from "react-native-reanimated";
import { ReText } from "react-native-redash/lib/module";

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    backgroundColor: "#FEFFFF",
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const formatInt = (value) => {
  const t = floor(divide(value, 1000));
  return cond(lessThan(t, 1), concat(t), concat(t, ",", modulo(value, 1000)));
};




const Label = ({ domain, size, y, opacity }) => {

  const format = (value) => {
    if (Platform.OS === "android") {
      return concat("$ ", divide(floor(multiply(value, 100)), 100));
    }
    const int = floor(value);
    const numLimit = parseFloat(min) > 1 ? 100 : 10000;
    const dec = floor(multiply(sub(value, int), numLimit));
    const formattedDec = cond(
      eq(dec, 0),
      "00",
      cond(lessThan(dec, 10), concat("0", dec), concat(dec))
    );
    return concat("$", int, ".", formattedDec);
  };

  const min = domain[0]
  const max = domain[1]

  const value = interpolateNode(y, {
    inputRange: [0, size],
    outputRange: [max, min],
  });
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: y }, { translateX: 0 }], opacity }]}
    >
      <ReText
        text={format(value)}
        style={{ color: "black", fontVariant: ["tabular-nums"] }}
      />
    </Animated.View>
  );
};

export default Label;