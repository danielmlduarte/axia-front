import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

interface NotificationProps {
  message: string;
  handleClose?: any;
  open: boolean;
}

export default function Notification(props: NotificationProps) {
  const { message, handleClose, open } = props;

  React.useEffect(() => {
    if (!open) return;

    const timeout = setTimeout(() => {
      handleClose();
    }, 5000); // 5 segundos

    return () => clearTimeout(timeout); // limpa o timeout se o componente desmontar ou open mudar
  }, [open, handleClose]);

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        message={message}
        key={"top" + "right"}
      />
    </Box>
  );
}