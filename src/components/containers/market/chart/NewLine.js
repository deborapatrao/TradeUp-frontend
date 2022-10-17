import React from "react";
import { Dimensions } from "react-native";
import { Svg, Line } from "react-native-svg";
import { scaleLinear } from "d3-scale";
import { Animated, SafeAreaView } from "react-native";

import Candle, { Candle as CandleModel } from "./Candle";

export const { width: size } = Dimensions.get("window");

const NewLine = () => {

  return (
    <Svg
      width={size}
      height={size}
      style={{ marginLeft: 10 }}
    >
      <Line
        x1={0}
        y1={0}
        x2={0}
        y2={size}
        strokeWidth={5}
        stroke="#B5B6B7"
        transform={`translate(${size}, 0)`}
      // strokeDasharray="6 6"
      />
    </Svg >
  );
};

export default NewLine;