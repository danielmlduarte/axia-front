import React, { useState, Children, ReactNode } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import LaunchIcon from '@mui/icons-material/Launch';

interface AccordionProps {
  title: any,
  subtitle: any,
  children: ReactNode,
  amountText: String,
  intervalTotal: number,
  topButtons?: any
}

export default function AccordionCustom(props: AccordionProps) {
  const { title, subtitle, children, amountText, intervalTotal, topButtons } = props
  const [colapseIcon, setColapseIcon] = useState(<CallToActionOutlinedIcon />)

  const handleExpandIcon = (_event: any, expanded: boolean) => {
    if (expanded) setColapseIcon(<CallToActionOutlinedIcon />)
    else setColapseIcon(<LaunchIcon />)
  }

  const topButtonsStopPropagation = (event: any) => {
    event.stopPropagation();
  }

  return (
    <Accordion sx={{backgroundColor: "#fff"}} onChange={handleExpandIcon} defaultExpanded>
      <AccordionSummary
        expandIcon={colapseIcon}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid item xs={8} pr={2} mt={1} mb={0}>
          <span className="chart-title">
            { title }
          </span>
        </Grid>
        <div onClick={(e) => topButtonsStopPropagation(e)}>
          { topButtons }
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Grid className="hide-to-print" item container xs={12} mt={1} justifyContent={subtitle && amountText ? "space-between" : subtitle ? "space-between" : "flex-end"} alignItems="center">
        { subtitle &&
          <Grid item mb={2} mt={1} paddingX={2}>
            <span className="c-b-cinza-icons chart-warning">{ subtitle }</span>
          </Grid>
        }
        { amountText &&
          <Grid item>
            <span className="chart-subtitle">
              { `${amountText}: ${intervalTotal}` }
            </span>
          </Grid>
        }
        </Grid>
        { Children.only(children) }
      </AccordionDetails>
    </Accordion>
  );
}