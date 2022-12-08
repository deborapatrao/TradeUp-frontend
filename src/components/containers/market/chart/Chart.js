import React from "react";
import { Dimensions, View, Text } from "react-native";
import { Svg, Line } from "react-native-svg";
import { scaleLinear } from "d3-scale";

import Candle, { Candle as CandleModel } from "./Candle";

// Getting size based on the device width
export const { width: size } = Dimensions.get("window");
const newSize = size - 90;



const Chart = ({ candles, domain }) => {
  const width = newSize / candles.length;
  const scaleY = scaleLinear().domain(domain).range([size, 0]);
  const scaleBody = scaleLinear()
    .domain([0, Math.max(...domain) - Math.min(...domain)])
    .range([0, size]);

  const newThing = () => {
    const min = domain[1];
    const max = domain[0];

    const range = max - min;
    const step = range / 8;
    const steps = [];
    for (let i = 0; i < 8; i++) {
      let newNum = (min + i * step);
      let strNum = '';
      if (newNum < 1) {
        strNum = newNum.toFixed(4).toString();
      } else {
        strNum = newNum.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      steps.push(strNum);
    }

    return steps;
  }

  const steps = newThing();


  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row' }}>
        <Svg
          width={newSize}
          height={size}
        >
          {candles.map((candle, index) => (
            <Candle
              key={index}
              {...{ candle, index, width, scaleY, scaleBody }}
            />
          ))}
        </Svg>

        <View style={{ flex: 1, flexDirection: 'row', }}>
          <Svg
            width={20}
            height={size}
          // style={{ backgroundColor: 'blue' }}
          >
            <Line
              x1={0}
              y1={0}
              x2={0}
              y2={size}
              strokeWidth={2}
              stroke="#B5B6B7"
              transform={`translate(${10}, 0)`}
            // strokeDasharray="6 6"
            />
          </Svg >

          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            {steps.map((item, index) => {
              return <Text key={index} style={{ color: 'white' }}>{item}</Text>
            })}
          </View>
        </View>
      </View >

      <View style={{ flexDirection: 'column', maxWidth: newSize + 10 }}>
        <Svg
          width={newSize + 10}
          height={10}
        // style={{ backgroundColor: 'blue' }}
        >
          <Line
            x1={size}
            y1={0}
            x2={0}
            y2={0}
            strokeWidth={4}
            stroke="#B5B6B7"
            transform={`translate(0, 0)`}
          // strokeDasharray="6 6"
          />
        </Svg >

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* {new Array(10).fill('abc').map((item, index) => {
            return <Text key={index} style={{ color: 'white' }}>{item}</Text>
          })} */}
        </View>
      </View>
    </View>
  );
};


export default Chart;