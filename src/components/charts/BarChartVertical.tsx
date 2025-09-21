import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LayoutType } from 'recharts/types/util/types';

interface ChartProps {
  data: BarChartData[] | any,
  sideLabel?: String,
  barLabel: string,
  handleSelectBar?: any,
  limiteYAxis?: boolean,
  yAxisUnit?: string,
  syncId?: string,
  config?: {
    fontSize?: number,
    layout?: LayoutType
  }
};

export default function BarChartCustom(props: ChartProps) {
  const { data, barLabel, handleSelectBar, yAxisUnit, syncId } = props

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value } = props;

    const yPosition = y + 11;
  
    return (
      <text x={width < 170 ? x + width + 2 : width + x - 2} y={yPosition} fill="#344767" textAnchor={width < 170 ? "start" : "end"} dominantBaseline="middle" fontSize={11} fontWeight={500}>
        {(value).toString().replace('.', ',')}{yAxisUnit ? yAxisUnit : ""}
      </text>
    );
  };

  const formatterTooltip = (value: number) => {
    return `${(value).toString().replace('.', ',')}${yAxisUnit ? yAxisUnit : ""}`;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
        <BarChart syncId={syncId} layout='vertical' data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} onClick={handleSelectBar}>
          <CartesianGrid stroke="#c9cbcd" vertical={true} horizontal={false}  />
          <Tooltip cursor={{fill: "#cccccc60"}} formatter={formatterTooltip}/>
          <XAxis type='number' domain={[0, 100]} axisLine={false} tickLine={false} padding={{ left: 16, right: 16 }} tick={{fill: '#757575', fontSize: '11px'}} tickCount={11} interval={0} />
          <YAxis type='category' dataKey='yData' hide />
          <Bar dataKey="xData" name={barLabel} barSize={20} radius={[4, 4, 4, 4]} minPointSize={5}>
            <LabelList dataKey="yData" content={renderCustomizedLabel} />
            {data.map((index: number) => (
              <Cell cursor="pointer" key={`cell-${index}`} fill="#d4dee4" />
            ))}
          </Bar>
        </BarChart>
    </ResponsiveContainer>
  )
}
