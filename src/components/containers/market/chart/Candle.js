import React from "react";
import { Line, Rect } from "react-native-svg";



const Candle = ({ candle, index, width, scaleY, scaleBody }) => {
  const { close, open, high, low } = candle;
  // Greeen and Red colors for the candles (not from Figma bc from Figma it's hard to see)
  const fill = close > open ? "#4AFA9A" : "#E33F64";
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);
  const margin = 2;


  return (
    <>
      <Line
        x1={x + width / 2}
        y1={scaleY(low)}
        x2={x + width / 2}
        y2={scaleY(high)}
        stroke={fill}
        strokeWidth={1}
      />
      <Rect
        x={x + margin}
        y={scaleY(max)}
        width={width - margin * 2}
        height={scaleBody(max - min)}
        {...{ fill }}
      />
    </>
  );
};


export default Candle;