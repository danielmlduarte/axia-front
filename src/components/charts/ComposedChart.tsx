import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Bar, CartesianGrid, Cell, ComposedChart, LabelList, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import { BADSTR } from 'dns';

interface ChartData {
  "xData": String,
  "yData": number,
  "name": String,
  "rawData": []
};

interface ChartProps {
  data: ChartData[] | any,
  title: String,
  sideLabel: String,
  amountText: String,
  subtitle: String,
  barLabel: string,
  handleSelectBar?: any
};

export default function BarChartCustom(props: ChartProps) {
  const { data, title, subtitle, sideLabel, amountText, barLabel, handleSelectBar } = props
  const [chartData, setChartData] = React.useState<[] | any>([]);
  const [intervalTotal, setIntervalTotal] = useState(0)
  const [colapseIcon, setColapseIcon] = React.useState(<CallToActionOutlinedIcon />)

  useEffect(() => {
    const changeBarLabel = (data: ChartData[]) => {
      const changedChartData = data.map((data: ChartData) => {
        const tax = (Math.random() * data.yData)
        return {
          xData: data.xData,
          [barLabel]: data.yData,
          yData: tax.toFixed(0),
          percent: ((tax / data.yData) * 100).toFixed(0),
          expected: (((Math.random() * data.yData) / data.yData) * 100).toFixed(0),
          rawData: data.rawData,
        }
      });
      setChartData(changedChartData)
    }
    
    const interval = data ? data.reduce((acc: number, previous: ChartData) => acc = acc + previous.yData, 0) : 0;
    changeBarLabel(data)
    setIntervalTotal(interval);
  }, [barLabel, data]);

  const handleExpandIcon = (_event: any, expanded: boolean) => {
    if (expanded) setColapseIcon(<CallToActionOutlinedIcon />)
    else setColapseIcon(<LaunchIcon />)
  }
  
  const handleBarSize = (): number => {
    const MIN = 35;
    const MAX = 120;
    const barSize = 240 / data.length;
    return barSize < MIN ? MIN : barSize > MAX ? MAX : barSize
  }


  return (
    <Grid item xs={12}>
      <Accordion className="bgc-b-cinza-grafico" onChange={handleExpandIcon} defaultExpanded>
        <AccordionSummary
          expandIcon={colapseIcon}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <span className="chart-title">
            { title }
          </span>
        </AccordionSummary>
        <AccordionDetails>
            <Grid item container xs={12} px={2} mt={1} mb={0} justifyContent="space-between" alignItems="center">
              <Grid item>
                <span className="c-b-cinza-icons chart-warning">{ subtitle }</span>
              </Grid>
              <Grid item mb={2}>
                <span className="chart-subtitle">
                  { `${amountText}: ${intervalTotal}` }
                </span>
              </Grid>
            </Grid>
            <Grid item xs={12} pb={2} mb={3}>
              <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={chartData} margin={{ top: 20, right: 18, left: 30, bottom: 0 }} onClick={handleSelectBar}>
                    <CartesianGrid stroke="#c9cbcd" vertical={false} />
                    <XAxis dataKey="xData" fontSize={12} axisLine={false} tickLine={false} height={35} tickMargin={15} />
                    <YAxis axisLine={false} tickLine={false} fontSize={14} interval={0} label={{ value: sideLabel, angle: 270, position: "left" , style: { textAnchor: 'middle'}, fontSize: 14, offset: 5 }} />
                    <YAxis axisLine={false} tickLine={false} fontSize={14} interval={0} 
                      yAxisId="right"
                      type="number"
                      dataKey="percent"
                      domain={[0, 100]}
                      name="weight"
                      unit="%"
                      orientation="right"
                      stroke="#82ca9d"
                    />
                    <Tooltip cursor={{fill: "#cccccc60"}}/>
                    <Bar dataKey={barLabel} barSize={handleBarSize()} fill="#607d8b" radius={[4, 4, 4, 4]}>
                      <LabelList dataKey={barLabel} position="insideTop" fill="#fff" fontSize={11}/>
                      {data.map((index: number) => (
                        <Cell cursor="pointer" key={`cell-${index}`} />
                      ))}
                    </Bar>
                    <Bar dataKey="yData" barSize={handleBarSize()} fill="#607d8b" radius={[4, 4, 4, 4]}>
                      <LabelList dataKey="yData" position="insideTop" fill="#fff" fontSize={11}/>
                      {data.map((index: number) => (
                        <Cell cursor="pointer" key={`cell-${index}`} />
                      ))}
                    </Bar>
                    {/* <Scatter yAxisId="right" line={{stroke: 'red', strokeWidth: 5}} name="Porcentagem" dataKey="percent"/> */}
                    <Line yAxisId="right" dataKey="percent" dot={false} stroke="#8bc34a" strokeWidth={4}/>
                    <Line yAxisId="right" dataKey="expected" strokeDasharray="5 5" dot={false} stroke="#1abc9c" strokeWidth={4}/>
                  </ComposedChart>
              </ResponsiveContainer>
            </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}
