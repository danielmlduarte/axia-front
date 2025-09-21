import * as React from 'react';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/AddCircle';
import CrossIcon from '@mui/icons-material/HighlightOff';
import { Grid } from '@mui/material';

interface BadgeProps {
  handleDelete?: any;
  label: string;
  deletable?: boolean;
  addOrDel?: boolean;
}

export default function DeletableChips(props: BadgeProps) {
  const { label, handleDelete, deletable, addOrDel } = props;
  const [isClicked, setIsClicked] = React.useState(false);

  const handleDeleteClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      handleDelete(label);
      setIsClicked(false);
    }, 150);
  };

  return (
    <Grid item mb={2}>
      { deletable 
        ? <Chip label={label} variant={addOrDel ? "outlined" : "filled"} onDelete={() => handleDeleteClick()} deleteIcon={addOrDel ? <CrossIcon className={isClicked ? "transform-icon-change-in" : ""} /> : <AddIcon className={isClicked ? "transform-icon-change-out" : ""} />} />
        : <Chip label={label} variant={addOrDel ? "outlined" : "filled"} />
      }
    </Grid>
  )
}