import { PieChart, Pie, Cell, Legend, Label } from 'recharts';
import { AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import LaunchIcon from '@mui/icons-material/Launch';

const COLORS = ['#8bc34a', '#607d8b', '#1abc9c', '#5FB5DF', '#90A4AE', '#57802B'];

interface ChartData {
  "value": number,
  "name": String,
  "rawData": any
};

type TooltipType = [number, string][];

interface HeaderData {
  tooltips: TooltipType[];
  data: Array<string | number>;
}

interface PieChartData {
  headerData: HeaderData;
  contentData: Array<string | number | Array<string | number>>;
  rawData: ChartData[];
}

interface SummaryTotalizerData {
  headerData: HeaderData;
  contentData: Array<string | number | Array<string | number>>;
}

interface ChartProps {
  data: ChartData[] | PieChartData | any,
  title: string,
  subtitle: string,
  handleSelectBar?: any
  name: string,
  componentRefPrint?: any,
  setIsPrinting?: any,
  hardCodedQuantityXWeight?: boolean,
  skipFirstHeader?: boolean,
  totalizerData?: SummaryTotalizerData,
  tooltipIcon?: boolean
};

export default function PieChartCustom(props: ChartProps) {
  const { data, title, handleSelectBar, name, subtitle, componentRefPrint, setIsPrinting, hardCodedQuantityXWeight, skipFirstHeader, totalizerData, tooltipIcon = true } = props;
  const [chartData, setChartData] = React.useState<[] | any>([]);
  const [intervalTotal, setIntervalTotal] = React.useState(0);
  const [colapseIcon, setColapseIcon] = React.useState(<CallToActionOutlinedIcon />);

  const getRawData = (index: number) => {
    if (data.contentData) {
      handleSelectBar(name, data.rawData[index]);
    } else {
      handleSelectBar(name, data[index]);
    }
    
  }

  useEffect(() => {
    if (data.contentData) {
      const interval = data.contentData ? data.contentData.reduce((acc: number, curr: Array<string | number | Array<string | number>>) => acc = acc + parseInt('' + curr[1]), 0) : 0;

      setIntervalTotal(interval);
      setChartData(data.rawData);
    } else {
      const interval = data ? data.reduce((acc: number, curr: ChartData) => acc = acc + curr.value, 0) : 0;

      setIntervalTotal(interval);
      setChartData(data);
    }
  }, [data]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, }: { cx: any, cy: any, midAngle: any, innerRadius: any, outerRadius: any, percent: any, index: any }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" onClick={() => getRawData(index)} cursor="pointer">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const handleExpandIcon = (_event: any, expanded: boolean) => {
    if (expanded) setColapseIcon(<CallToActionOutlinedIcon />)
    else setColapseIcon(<LaunchIcon />)
  }

  const printButtonStopPropagation = (event: any) => {
    event.stopPropagation();
  }

  return (
    <Accordion className="bgc-b-cinza-grafico" onChange={handleExpandIcon} defaultExpanded>
      <AccordionSummary
        expandIcon={colapseIcon}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid item xs={12} px={2} mt={1} mb={0}>
          <span className="filter-label hide-to-print">
            { title }
          </span>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid className="bgc-b-cinza-grafico" container p={0}>
          <Grid className="hide-to-print" item xs={12} pb={2} pl={2} mt={2}>
            <span className="c-b-cinza-icons chart-warning">
              { subtitle }
            </span>
          </Grid>
          <Grid item pb={2} xs={12} container justifyContent="center" alignItems="center">
            <PieChart width={470} height={470}>
              <circle cx="235" cy="224" r="187" fill="transparent" stroke="#F1F3F3" strokeWidth="15"cursor="pointer"/>
              <circle cx="235" cy="224" r="103" fill="transparent" stroke="#AAAAAA" strokeWidth="2" strokeDasharray="2,10"/>
              <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={110} outerRadius={180} fill="#82ca9d" onClick={(event) => handleSelectBar(name, event)} label={renderCustomizedLabel} labelLine={false}>
                {chartData.map((_entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} cursor="pointer"/>
                ))}
                <Label value={`${intervalTotal} cab.`} offset={0} position="center" fontSize={26} color="#292D30" />
              </Pie>
              <Legend iconType="square" fontSize={14} color="#8D9092" radius={4} height={0} verticalAlign="bottom" />
            </PieChart>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
