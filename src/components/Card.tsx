import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

interface CardProps {
  title: string,
  textValue: string | number,
  colorType: string,
  big: boolean;
  tooltipText?: string | null;
}

export default function BasicCard(props: CardProps) {
  const { title, textValue, colorType, tooltipText } = props;

  return (
    <Tooltip title={tooltipText}>
      <Card className={"card-root card-color-" + colorType} sx={{ minWidth: 150 }}>
          <CardContent sx={{ width: '100%' }}>
            <Typography className="card-main-text" component="div">
              {title}
            </Typography>
            <Typography className="card-secondary-text">
              {textValue}
            </Typography>
          </CardContent>
          <CardActions>
            
          </CardActions>
      </Card>
    </Tooltip>
  );
}
