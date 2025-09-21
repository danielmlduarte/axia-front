import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

interface ModalProps {
  handleClose?: any;
  open: boolean
  handleConfirm?: any
  title: string
  description: any
}

export default function ConceptsModal(props: ModalProps) {
  const { open, handleClose, handleConfirm, title, description } = props
  const [isOpen, setIsOpen] = React.useState(open)

  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        { title }
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setIsOpen(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        { description }
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
        <Button autoFocus onClick={() => setIsOpen(false)}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
