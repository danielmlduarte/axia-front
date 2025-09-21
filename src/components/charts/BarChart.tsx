import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ChartProps {
  data: BarChartData[] | any,
  sideLabel: string,
  barLabel: string,
  secondBarLabel?: string,
  handleSelectBar?: any,
  limiteYAxis?: boolean,
  yAxisUnit?: string,
  indexValues?: boolean,
  shortenNames?: boolean,
  doubleBars?: boolean,
  legend?: boolean,
  className?: string,
};

export default function BarChartCustom(props: ChartProps) {
  const { data, sideLabel, barLabel, secondBarLabel, handleSelectBar, limiteYAxis, yAxisUnit, indexValues, shortenNames = false, doubleBars = false, legend = false, className } = props;

  const handleBarSize = (): number => {
    const MIN = 45;
    const MAX = 120;
    const barSize = 350 / data.length;
    return barSize < MIN ? MIN : barSize > MAX ? MAX : barSize
  }

  const formatterTooltip = (value: number) => {
    return `${(value).toString().replace('.', ',')}${yAxisUnit ? yAxisUnit : ""}`
  }

  const handleBarColor = (value: any) => {
    return value.color
  }

  const nameShortener = (name: any) => {
    if (name && typeof name === 'string' && name.length > 12) {
      const shorterName: string = name.substring(0, 12) + "...";
      return shorterName;
    }
    return name;
  }

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value } = props;
    let maxValue = data.reduce((acc: number, curr: any) => {
      if (curr.yData > acc) acc = curr.yData
      return acc
    }, 0)

    if (doubleBars) {
      let maxValueYData2 = data.reduce((acc: number, curr: any) => {
        if (curr.yData2 > acc) acc = curr.yData2
        return acc
      }, 0);
      maxValue = maxValue > maxValueYData2 ? maxValue : maxValueYData2;
    }

    const yPosition = value === 0 ? y - 16 : value > 6 || maxValue < 10 ? y + 20 : y - 0
    const labelColor = value === 0 ? "#000" : value > 6 || maxValue < 10 ? "#fff" : "#000"
  
    return (
      <text x={x + width / 2} y={yPosition} fill={labelColor} textAnchor="middle" dominantBaseline="middle" fontSize={11}>
        {(value).toString().replace('.', ',')}{yAxisUnit ? yAxisUnit : ""}
      </text>
    );
  };

  const CustomXAxisTick = ({ x, y, payload }: any) => {
    if (payload && payload.value) {
      const words = payload.value.split(" ")
      const wordsLength = words.length / 2
      var res = words[Math.floor(words.length / 2)]
      let firstLine = payload.value
      let lastLine = ""
      if (wordsLength >= 2) {
        firstLine = payload.value.substring(0, payload.value.indexOf(res) + res.length)
        lastLine = payload.value.substring(payload.value.indexOf(res) + res.length)
      }

      return (
        <text
          fontSize={"12px"}
          width={12}
          x={x} 
          y={y} 
          textAnchor="middle"
        >
          <tspan>{indexValues && data.length > 8 ? data.findIndex((element: any) => element.xData === payload.value) + 1 : shortenNames ? nameShortener(payload.value) : firstLine}</tspan>
          { indexValues && data.length > 8 && shortenNames ? null : lastLine && <tspan y={y + 15} x={x}>{lastLine}</tspan> }
        </text>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
        <BarChart className={className} data={data} margin={{ top: 20, right: 18, left: 30, bottom: 0 }} onClick={handleSelectBar}>
          <CartesianGrid stroke="#c9cbcd" vertical={false} />
          <XAxis interval={0} tick={<CustomXAxisTick />} dataKey="xData" fontSize={12} axisLine={false} tickLine={false} height={40} tickMargin={15} />
          <YAxis
            axisLine={false}
            tickLine={false}
            fontSize={14}
            interval={0}
            label={{ value: sideLabel, angle: 270, position: "left" , style: { textAnchor: 'middle'}, fontSize: 14, offset: 5 }}
            domain={limiteYAxis ? [0, 100] : undefined}
            unit={yAxisUnit}
          />
          <Tooltip cursor={{fill: "#cccccc60"}} formatter={formatterTooltip} />
          {legend && <Legend layout="horizontal" verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: "20px" }} />}
          <Bar dataKey="yData" name={barLabel} barSize={handleBarSize()} radius={[4, 4, 4, 4]} minPointSize={5}>
            <LabelList dataKey="yData" content={renderCustomizedLabel} />
            {data.map((index: number) => (
              <Cell cursor="pointer" key={`cell-${index}`} fill={handleBarColor(index)} />
            ))}
          </Bar>
          { doubleBars &&
            <Bar dataKey="yData2" name={secondBarLabel} barSize={handleBarSize()} radius={[4, 4, 4, 4]} minPointSize={5}>
              <LabelList dataKey="yData2" content={renderCustomizedLabel} />
              {data.map((index: number) => (
                <Cell cursor="pointer" key={`cell-${index}`} fill={'#B2BF00'} />
              ))}
            </Bar>
          }
        </BarChart>
    </ResponsiveContainer>
  )
}
